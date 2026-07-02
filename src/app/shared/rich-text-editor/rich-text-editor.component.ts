import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-rich-text-editor',
  templateUrl: './rich-text-editor.component.html',
  styleUrl: './rich-text-editor.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: RichTextEditorComponent,
    multi: true
  }]
})
export class RichTextEditorComponent implements ControlValueAccessor, OnInit, AfterViewInit {
  @ViewChild('editableContent', {static: true}) editableContent!: ElementRef<HTMLDivElement>;
  @ViewChild('imageInput') imageInput!: ElementRef<HTMLInputElement>;
  @ViewChild('linkInput') linkInput!: ElementRef<HTMLInputElement>;

  content: string = '';
  textColor: string = '#000000';
  backgroundColor: string = '#ffffff';
  fontSize: string = '3';
  fontFamily: string = 'Arial, sans-serif';
  isSourceView: boolean = false;
  selection: Range | null = null;

  onChange: any = () => {
  };
  onTouch: any = () => {
  };

  constructor(private renderer: Renderer2) {
  }

  ngOnInit() {
    this.setupImagePasteHandler();
    this.setupSelectionSaver();
  }

  ngAfterViewInit() {
    this.makeContentEditable();
    this.editableContent.nativeElement.addEventListener('blur', () => {
      this.onTouch();
    });
  }

  private setupSelectionSaver() {
    // Save selection when clicking color picker
    document.addEventListener('mouseup', () => {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        this.selection = selection.getRangeAt(0).cloneRange();
      }
    });
  }

  makeContentEditable() {
    this.renderer.setAttribute(this.editableContent.nativeElement, 'contenteditable', 'true');
    this.renderer.setStyle(this.editableContent.nativeElement, 'min-height', '200px');
  }

  // ControlValueAccessor methods
  writeValue(value: string): void {
    this.content = value || '';

    if (!this.editableContent) {
      return;
    }

    const el = this.editableContent.nativeElement;

    if (this.isSourceView) {
      el.textContent = this.content;
    } else {
      el.innerHTML = this.content;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  // Editor formatting methods
  formatText(command: string, event?: any): void {
    let value = event;
    if (event?.target) {
      value = event.target.value;
    }
    if (command === 'formatBlock') {
      value = `<${value}>`; // Wrap the tag in <>
    }
    document.execCommand(command, false, value);
    this.onContentChange();
  }

  // Text formatting
  applyFormat(format: string): void {
    this.formatText(format);
  }

  // Color handling with selection restore
  setTextColor(event: Event): void {
    const color = (event.target as HTMLInputElement).value;
    this.textColor = color;
    // Restore selection before applying color
    if (this.selection) {
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(this.selection);
    }
    document.execCommand('foreColor', false, color);
    this.onContentChange();
  }

  setBackgroundColor(event: Event): void {
    const color = (event.target as HTMLInputElement).value;
    this.backgroundColor = color;
    // Restore selection before applying color
    if (this.selection) {
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(this.selection);
    }
    document.execCommand('hiliteColor', false, color);
    this.onContentChange();
  }

  // Event handlers with selection management
  onContentChange(): void {
    const el = this.editableContent.nativeElement;

    const value = this.isSourceView
      ? el.textContent || ''
      : el.innerHTML;

    this.content = value;
    this.onChange(value);

    if (!this.isSourceView) {
      const selection = window.getSelection();

      if (selection && selection.rangeCount > 0) {
        this.selection = selection.getRangeAt(0).cloneRange();
      }
    }
  }

  // Font size and family
  changeFontSize(event: Event): void {
    const size = (event.target as HTMLSelectElement).value;
    this.formatText('fontSize', size);
  }

  changeFontFamily(event: Event): void {
    const font = (event.target as HTMLSelectElement).value;
    this.formatText('fontName', font);
  }

  // Other existing methods remain the same
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Tab') {
      event.preventDefault();
      this.formatText('insertHTML', '&nbsp;&nbsp;&nbsp;&nbsp;');
    }
  }

  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const text = event.clipboardData?.getData('text/plain') || '';
    this.formatText('insertText', text);
  }

  // Update image handler to maintain content
  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (this.selection) {
          const selection = window.getSelection();
          selection?.removeAllRanges();
          selection?.addRange(this.selection);
        }
        const img = `<img src="${e.target?.result}" style="max-width: 100%;" alt="">`;
        this.formatText('insertHTML', img);
      };
      reader.readAsDataURL(file);
    }
  }

  setTextAlign(command: 'justifyLeft' | 'justifyCenter' | 'justifyRight' | 'justifyFull'): void {
    if (this.isSourceView) {
      return;
    }

    this.restoreSelection();
    this.editableContent.nativeElement.focus();

    document.execCommand(command, false);
    this.onContentChange();
  }

  private restoreSelection(): void {
    if (!this.selection) {
      return;
    }

    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(this.selection);
  }
  // Link handling
  insertLink(): void {
    const url = prompt('Enter URL:');
    if (url) {
      this.formatText('createLink', url);
    }
  }

  // Table handling
  insertTable(): void {
    const rows = prompt('Enter number of rows:', '3');
    const cols = prompt('Enter number of columns:', '3');
    if (rows && cols) {
      let table = '<table style="border-collapse: collapse; width: 100%;">';
      for (let i = 0; i < parseInt(rows); i++) {
        table += '<tr>';
        for (let j = 0; j < parseInt(cols); j++) {
          table += '<td style="border: 1px solid #ccc; padding: 8px;">&nbsp;</td>';
        }
        table += '</tr>';
      }
      table += '</table>';
      this.formatText('insertHTML', table);
    }
  }

// Image handling
  insertImage(): void {
    this.imageInput.nativeElement.click();
  }

  // Source code view toggle
  toggleSourceView(): void {
    const el = this.editableContent.nativeElement;

    if (this.isSourceView) {
      const html = el.textContent || '';

      this.isSourceView = false;
      this.content = html;
      el.innerHTML = html;
      this.onChange(html);
    } else {
      const html = el.innerHTML;

      this.isSourceView = true;
      this.content = html;
      el.textContent = html;
      this.onChange(html);
    }
  }

  private setupImagePasteHandler(): void {
    this.editableContent.nativeElement.addEventListener('paste', (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (items) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf('image') !== -1) {
            e.preventDefault();
            const file = items[i].getAsFile();
            if (file) {
              const reader = new FileReader();
              reader.onload = (e) => {
                const img = `<img src="${e.target?.result}" style="max-width: 100%;" alt="">`;
                this.formatText('insertHTML', img);
              };
              reader.readAsDataURL(file);
            }
            break;
          }
        }
      }
    });
  }

  protected insertNonBreakingSpace() {
    if (this.isSourceView) {
      this.formatText('insertText', '&nbsp;');
      return;
    }

    if (this.selection) {
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(this.selection);
    }

    this.formatText('insertHTML', '&nbsp;');
  }
}
