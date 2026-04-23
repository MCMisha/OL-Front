import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Subscription} from "rxjs";
import {AdminMainPageBackgroundService} from "../../../../services/admin/admin-main-page-background.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-admin-panel-slider-form',
  templateUrl: './admin-panel-slider-form.component.html',
  styleUrl: './admin-panel-slider-form.component.scss'
})
export class AdminPanelSliderFormComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  mainImage: string = 'data:image/jpeg;base64,';
  subscription = new Subscription();
  protected isLoading: boolean = true;
  isEditMode = false;
  backgroundId: number | null = null;

  form = this.fb.group({
    id: [0],
    title: ['', [Validators.required, Validators.maxLength(200)]],
    mainImage: ['', Validators.required],
    isActive: [true],
    displayOrder: [0, [Validators.required, Validators.min(0)]],
    createdAt: [null as Date | null, Validators.required]
  });
  selectedFiles: { mainImage: string | undefined } = {
    mainImage: undefined,
  };
  selectedFileNames: { mainImage: string | undefined } = {
    mainImage: undefined
  }

  isFileLoaded = {mainImage: false};

  constructor(
    private adminMainPageBackgroundService: AdminMainPageBackgroundService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;

      this.backgroundId = Number(idParam);
      this.loadBackground(this.backgroundId);
    } else {
      this.form.patchValue({
        createdAt: new Date()
      });
      this.isLoading = false;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private loadBackground(backgroundId: number) {
    this.subscription.add(
      this.adminMainPageBackgroundService.getById(backgroundId).subscribe({
        next: (background) => {
          this.form.patchValue({
            id: background.id,
            title: background.title,
            mainImage: background.mainImage,
            isActive: background.isActive,
            displayOrder: background.displayOrder,
            createdAt: new Date(background.createdAt)
          });
          this.selectedFiles.mainImage = background.mainImage;
          this.selectedFileNames.mainImage = 'Załadowane zdjęcie';
          this.isFileLoaded.mainImage = true;
          this.mainImage = `data:image/jpeg;base64,${background.mainImage}`;
          this.isLoading = false;
        },
        error: (err) => {
          this.snackBar.open(`Błąd ładowanie tła: ${err.error}`, 'Zamknij', {
            duration: 5000
          });
          this.isLoading = false;
        }
      })
    );
  }
  protected onFileSelected($event: Event, field: 'mainImage') {
    const input = $event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFileNames[field] = file.name;
      this.isFileLoaded[field] = false;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.selectedFiles[field] = (reader.result as string).split(',')[1];
        this.isFileLoaded[field] = true;
        this[field] = reader.result as string;
        this.form.patchValue({[field]: this.selectedFiles[field]});
        this.form.get(field)?.updateValueAndValidity();
      };

      input.value = '';
    }
  }

  protected onDeleteImage(field: 'mainImage') {
    this.selectedFiles[field] = undefined;
    this.selectedFileNames[field] = undefined;
    this.isFileLoaded[field] = false;
    this.form.patchValue({[field]: null});
    this.form.get(field)?.updateValueAndValidity();
    this[field] = '';
  }

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.snackBar.open('Uzupełnij poprawnie wszystkie wymagane pola.', 'Zamknij', {
        duration: 4000
      });
      return;
    }

    const formValue = this.form.getRawValue();

    const payload = {
      id: formValue.id ?? 0,
      title: (formValue.title ?? '').trim(),
      mainImage: formValue.mainImage ?? '',
      isActive: formValue.isActive ?? true,
      displayOrder: formValue.displayOrder ?? 0,
      createdAt: this.toIsoString(formValue.createdAt)
    };

    this.isLoading = true;

    if (this.isEditMode && this.backgroundId) {
      this.subscription.add(
        this.adminMainPageBackgroundService.update(payload).subscribe({
          next: () => {
            this.snackBar.open('Slajd został zaktualizowany.', 'Zamknij', {
              duration: 4000
            });
            this.isLoading = false;
            this.router.navigate(['../..'], { relativeTo: this.route });
          },
          error: (err) => {
            this.snackBar.open(
              `Błąd podczas aktualizacji slajdu: ${err?.error ?? 'Nieznany błąd'}`,
              'Zamknij',
              { duration: 5000 }
            );
            this.isLoading = false;
          }
        })
      );
    } else {
      this.subscription.add(
        this.adminMainPageBackgroundService.create(payload).subscribe({
          next: () => {
            this.snackBar.open('Slajd został dodany.', 'Zamknij', {
              duration: 4000
            });
            this.isLoading = false;
            this.router.navigate(['..'], { relativeTo: this.route });
          },
          error: (err) => {
            this.snackBar.open(
              `Błąd podczas dodawania slajdu: ${err?.error ?? 'Nieznany błąd'}`,
              'Zamknij',
              { duration: 5000 }
            );
            this.isLoading = false;
          }
        })
      );
    }
  }

  private toIsoString(date: Date | string | null): string {
    if (!date) {
      return new Date().toISOString();
    }

    if (date instanceof Date) {
      return date.toISOString();
    }

    return new Date(date).toISOString();
  }
}
