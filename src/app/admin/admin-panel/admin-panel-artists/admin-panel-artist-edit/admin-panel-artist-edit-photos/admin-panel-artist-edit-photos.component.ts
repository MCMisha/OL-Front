import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AdminArtistPhotoService} from '../../../../../services/admin/admin-artist-photo.service';
import {ArtistPhoto} from '../../../../../models/artist-photo';
import {ActivatedRoute} from "@angular/router";

interface SelectedPhotoPreview {
  file: File;
  previewUrl: string;
}

@Component({
  selector: 'app-admin-panel-artist-edit-photos',
  templateUrl: './admin-panel-artist-edit-photos.component.html',
  styleUrl: './admin-panel-artist-edit-photos.component.scss'
})
export class AdminPanelArtistEditPhotosComponent implements OnInit, OnDestroy {
  artistId: number | undefined;
  artistPhotos: ArtistPhoto[] = [];
  selectedPhotos: SelectedPhotoPreview[] = [];

  isLoading = false;
  isUploading = false;
  isDeleting = false;

  private subscription = new Subscription();

  constructor(
    private artistPhotoService: AdminArtistPhotoService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.artistId = this.route.snapshot.params['id'];
    console.log(this.artistId);
    if (this.artistId) {
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
      this.artistPhotoService.getArtistPhotos(this.artistId ?? 0).subscribe({
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
    if (!this.artistId || this.selectedPhotos.length === 0) {
      return;
    }

    this.isUploading = true;

    const files = this.selectedPhotos.map(photo => photo.file);

    this.subscription.add(
      this.artistPhotoService.addArtistPhotos(this.artistId, files).subscribe({
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
    if (!this.artistId) {
      return;
    }

    const confirmed = confirm('Czy na pewno chcesz usunąć to zdjęcie?');

    if (!confirmed) {
      return;
    }

    this.isDeleting = true;

    this.subscription.add(
      this.artistPhotoService.deleteArtistPhoto(this.artistId, photoId).subscribe({
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

  trackByPhotoId(index: number, photo: ArtistPhoto): number {
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
