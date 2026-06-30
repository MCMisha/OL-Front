import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SelectedPhotoPreview} from "../../../../../models/selected-photo-preview";
import {AdminPerformancePhotoService} from "../../../../../services/admin/admin-performance-photo.service";
import {PerformancePhoto} from "../../../../../models/performance-photo";

@Component({
  selector: 'app-admin-panel-performance-edit-photos',
  templateUrl: './admin-panel-performance-edit-photos.component.html',
  styleUrl: './admin-panel-performance-edit-photos.component.scss'
})
export class AdminPanelPerformanceEditPhotosComponent implements OnInit, OnDestroy {
  performanceId: number | undefined;
  artistPhotos: PerformancePhoto[] = [];
  selectedPhotos: SelectedPhotoPreview[] = [];

  isLoading = false;
  isUploading = false;
  isDeleting = false;

  private subscription = new Subscription();

  constructor(
    private adminPerformancePhotoService: AdminPerformancePhotoService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.performanceId = this.route.snapshot.params['id'];
    if (this.performanceId) {
      this.loadArtistPhotos();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.clearPreviewUrls();
  }

  loadArtistPhotos(): void {
    this.isLoading = true;

    this.subscription.add(
      this.adminPerformancePhotoService.getPerformancePhoto(this.performanceId ?? 0).subscribe({
        next: photos => {
          this.artistPhotos = photos;
          this.isLoading = false;
        },
        error: err => {
          console.error(err);
          this.snackBar.open('Błąd podczas pobierania zdjęć artysty', 'Zamknij', {
            duration: 5000
          });
          this.isLoading = false;
        }
      })
    );
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    this.clearPreviewUrls();

    const files = Array.from(input.files)
      .filter(file => file.type.startsWith('image/'));

    if (files.length === 0) {
      this.snackBar.open('Wybierz pliki graficzne', 'Zamknij', {
        duration: 4000
      });
      input.value = '';
      return;
    }

    this.selectedPhotos = files.map(file => ({
      file,
      previewUrl: URL.createObjectURL(file)
    }));

    input.value = '';
  }

  removeSelectedPhoto(index: number): void {
    const removedPhoto = this.selectedPhotos[index];

    if (removedPhoto) {
      URL.revokeObjectURL(removedPhoto.previewUrl);
    }

    this.selectedPhotos.splice(index, 1);
  }

  uploadPhotos(): void {
    if (!this.performanceId || this.selectedPhotos.length === 0) {
      return;
    }

    this.isUploading = true;

    const files = this.selectedPhotos.map(photo => photo.file);

    this.subscription.add(
      this.adminPerformancePhotoService.addPerformancePhotos(this.performanceId, files).subscribe({
        next: createdPhotos => {
          this.artistPhotos = [...this.artistPhotos, ...createdPhotos];
          this.clearSelectedPhotos();

          this.snackBar.open('Zdjęcia zostały dodane', 'Zamknij', {
            duration: 4000
          });

          this.isUploading = false;
        },
        error: err => {
          console.error(err);
          this.snackBar.open('Błąd podczas dodawania zdjęć', 'Zamknij', {
            duration: 5000
          });
          this.isUploading = false;
        }
      })
    );
  }

  deletePhoto(photoId: number): void {
    if (!this.performanceId) {
      return;
    }

    const confirmed = confirm('Czy na pewno chcesz usunąć to zdjęcie?');

    if (!confirmed) {
      return;
    }

    this.isDeleting = true;

    this.subscription.add(
      this.adminPerformancePhotoService.deletePerformancePhoto(this.performanceId, photoId).subscribe({
        next: () => {
          this.artistPhotos = this.artistPhotos.filter(photo => photo.id !== photoId);

          this.snackBar.open('Zdjęcie zostało usunięte', 'Zamknij', {
            duration: 4000
          });

          this.isDeleting = false;
        },
        error: err => {
          console.error(err);
          this.snackBar.open('Błąd podczas usuwania zdjęcia', 'Zamknij', {
            duration: 5000
          });
          this.isDeleting = false;
        }
      })
    );
  }

  getPhotoUrl(photo: string): string {
    if (!photo) {
      return 'assets/images/artist-placeholder.jpg';
    }

    if (photo.startsWith('data:image') || photo.startsWith('assets/')) {
      return photo;
    }

    return `data:image/jpeg;base64,${photo}`;
  }

  clearSelectedPhotos(): void {
    this.clearPreviewUrls();
    this.selectedPhotos = [];
  }

  trackByPhotoId(index: number, photo: PerformancePhoto): number {
    return photo.id;
  }

  trackByPreview(index: number, photo: SelectedPhotoPreview): string {
    return photo.previewUrl;
  }

  private clearPreviewUrls(): void {
    this.selectedPhotos.forEach(photo => {
      URL.revokeObjectURL(photo.previewUrl);
    });
  }
}
