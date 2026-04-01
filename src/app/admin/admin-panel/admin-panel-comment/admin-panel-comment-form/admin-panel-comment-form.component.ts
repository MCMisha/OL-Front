import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Subscription} from "rxjs";
import { AdminCommentService } from "../../../../services/admin/admin-comment.service";
import {PerformancesService} from "../../../../services/performances.service";
import {Comment} from "../../../../models/comment";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-admin-panel-comment-form',
  templateUrl: './admin-panel-comment-form.component.html',
  styleUrl: './admin-panel-comment-form.component.scss'
})
export class AdminPanelCommentFormComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  protected maxDate = new Date();
  private snackBar = inject(MatSnackBar);
  photo: string = 'data:image/jpeg;base64,'
  subscription = new Subscription();
  protected isLoading: boolean = true;
  isEditMode = false;
  commentId: number | null = null;

  performances: { id: number; title: string }[] = [];

  form = this.fb.group({
    id: [0],
    photo: ['', Validators.required],
    firstName: ['', [Validators.required, Validators.maxLength(100)]],
    stars: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
    performanceId: [null as number | null, Validators.required],
    comment: ['', [Validators.required, Validators.maxLength(2000)]],
    datePublished: [null as Date | null, Validators.required],
    isShowing: [true]
  });
  selectedFiles: { photo: string | undefined } = {
    photo: undefined,
  };
  selectedFileNames: { photo: string | undefined } = {
    photo: undefined
  };
  isFileLoaded = {photo: false };
  constructor(
    private adminPublicCommentService: AdminCommentService,
    private performanceService: PerformancesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPerformances();
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;

      this.commentId = Number(idParam);
      this.loadComment(this.commentId);
    } else {
      this.form.patchValue({
        datePublished: new Date()
      });
      this.isLoading = false;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadPerformances(): void {
    this.subscription.add(
      this.performanceService.getPerformances().subscribe({
        next: (res) => {
          this.performances = res.map((p: any) => ({
            id: p.id,
            title: p.title
          }));
        },
        error: () => {
          this.snackBar.open('Не удалось загрузить спектакли', 'Закрыть', {
            duration: 4000
          });
        }
      })
    );
  }

  loadComment(id: number): void {
    this.isLoading = true;

    this.subscription.add(
      this.adminPublicCommentService.getCommentById(id).subscribe({
        next: (comment) => {
          this.form.patchValue({
            id: comment.id,
            photo: comment.photo,
            firstName: comment.firstName,
            stars: comment.stars,
            performanceId: comment.performanceId,
            comment: comment.comment,
            datePublished: comment.datePublished ? new Date(comment.datePublished) : null,
            isShowing: comment.isShowing
          });
          this.selectedFiles.photo = comment.photo;
          this.selectedFileNames.photo = 'Załadowane zdjęcie';
          this.isFileLoaded.photo = true;
          this.photo = `data:image/jpeg;base64,${comment.photo}`;
          this.isLoading = false;
        },
        error: (err) => {
          this.snackBar.open(`Ошибка загрузки комментария: ${err.error}`, 'Закрыть', {
            duration: 5000
          });
          this.isLoading = false;
        }
      })
    );
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const formValue = this.form.getRawValue();

    const payload: Comment = {
      id: formValue.id ?? 0,
      photo: formValue.photo ?? '',
      firstName: formValue.firstName ?? '',
      stars: formValue.stars ?? 5,
      performanceId: formValue.performanceId ?? 0,
      comment: formValue.comment ?? '',
      datePublished: new Date(formValue.datePublished ?? '').toISOString(),
      isShowing: formValue.isShowing ?? true
    };

    const request$ = this.isEditMode
      ? this.adminPublicCommentService.updateComment(payload)
      : this.adminPublicCommentService.createComment(payload);

    this.subscription.add(
      request$.subscribe({
        next: () => {
          this.snackBar.open(
            this.isEditMode ? 'Komentarz został zaktualizowany' : 'Komentarz został stworzony',
            'Zamknij',
            { duration: 4000 }
          );
          this.isLoading = false;
          this.router.navigate(this.isEditMode ? ['../..'] : ['..'], {relativeTo: this.route});
        },
        error: (err) => {
          this.snackBar.open(
            `Błąd zapisu: ${err.error ?? 'niewiadomy błąd'}`,
            'Zamknij',
            { duration: 5000 }
          );
          this.isLoading = false;
        }
      })
    );
  }
  protected onFileSelected($event: Event, field: 'photo') {
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

  protected onDeleteImage(field: 'photo') {
    this.selectedFiles[field] = undefined;
    this.selectedFileNames[field] = undefined;
    this.isFileLoaded[field] = false;
    this.form.patchValue({[field]: null});
    this.form.get(field)?.updateValueAndValidity();
    this[field] = '';
  }
}
