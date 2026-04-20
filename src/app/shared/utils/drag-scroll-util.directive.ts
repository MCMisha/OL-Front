import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDragScroll]'
})
export class DragScrollDirective {
  private isDown = false;
  private startX = 0;
  private scrollLeft = 0;

  constructor(private el: ElementRef) {}

  @HostListener('mousedown', ['$event'])
  onMouseDown(e: MouseEvent) {
    this.isDown = true;
    this.startX = e.pageX - this.el.nativeElement.offsetLeft;
    this.scrollLeft = this.el.nativeElement.scrollLeft;

    this.el.nativeElement.classList.add('dragging');
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.isDown = false;
    this.el.nativeElement.classList.remove('dragging');
  }

  @HostListener('mouseup')
  onMouseUp() {
    this.isDown = false;
    this.el.nativeElement.classList.remove('dragging');
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (!this.isDown) return;

    e.preventDefault();
    const x = e.pageX - this.el.nativeElement.offsetLeft;
    const walk = (x - this.startX) * 1.5;

    this.el.nativeElement.scrollLeft = this.scrollLeft - walk;
  }

}
