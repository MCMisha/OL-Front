import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminArtistService } from "../../../../services/admin/admin-artist.service";
import {ArtistCategory} from "../../../../models/enums/artist-category.enum";
import {ArtistCategoryLabels} from "../../../../models/enums/artist-category-labels";

@Component({
  selector: 'app-new-artist',
  templateUrl: './admin-panel-artist-new.component.html',
  styleUrls: ['./admin-panel-artist-new.component.scss']
})
export class AdminPanelArtistNewComponent implements OnInit {
  artistForm!: FormGroup;
  isLoading = false;
  isFileLoaded = false;

  selectedFileName: string | null = null;
  previewImage: string | null = null;

  categories: { value: ArtistCategory; label: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snack: MatSnackBar,
    private artistService: AdminArtistService
  ) {}

  ngOnInit(): void {
    this.categories = Object.values(ArtistCategory)
      .filter(value => typeof value === 'number')
      .map(value => ({
        value: value as ArtistCategory,
        label: ArtistCategoryLabels[value as ArtistCategory]
      }));

    this.artistForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      category: [null, Validators.required],
      description: ['', [Validators.maxLength(5000)]],
      photo: [null, Validators.required]
    });
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    this.selectedFileName = file.name;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      this.artistForm.patchValue({ photo: base64 });
      this.previewImage = 'data:image/jpeg;base64,' + base64;
    };
    reader.readAsDataURL(file);
  }

  onDeleteImage() {
    this.selectedFileName = null;
    this.previewImage = null;
    this.artistForm.patchValue({ photo: null });
  }

  createArtist() {
    if (this.artistForm.invalid) return;

    this.isLoading = true;

    this.artistService.createArtist(this.artistForm.value)
      .subscribe({
        next: () => {
          this.snack.open('Artysta został dodany', 'Zamknij', { duration: 3000 });
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: () => {
          this.snack.open('Błąd podczas dodawania artysty', 'Zamknij', { duration: 3000 });
          this.isLoading = false;
        }
      });
  }

  cancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
