import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AdminArtistService} from "../../../../services/admin/admin-artist.service";
import {ArtistCategory} from "../../../../models/enums/artist-category.enum";
import {ArtistCategoryLabels} from "../../../../models/enums/artist-category-labels";

@Component({
  selector: 'app-admin-panel-artist-edit',
  templateUrl: './admin-panel-artist-edit.component.html',
  styleUrls: ['./admin-panel-artist-edit.component.scss']
})
export class AdminPanelArtistEditComponent implements OnInit {
  artistForm!: FormGroup;
  isLoading = false;

  selectedFileName: string | null = null;
  previewImage: string | null = null;
  isFileLoaded = false;

  categories: { value: ArtistCategory; label: string }[] = [];
  artistId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snack: MatSnackBar,
    private artistService: AdminArtistService
  ) {}

  ngOnInit(): void {
    this.artistId = Number(this.route.snapshot.paramMap.get('id')) || null;

    this.categories = Object.values(ArtistCategory)
      .filter(value => typeof value === 'number')
      .map(value => ({
        value: value as ArtistCategory,
        label: ArtistCategoryLabels[value as ArtistCategory]
      }));

    this.artistForm = this.fb.group({
      id: ['', [Validators.required]],
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      category: [null, Validators.required],
      description: ['', [Validators.maxLength(5000)]],
      photo: [null, Validators.required]
    });

    if (this.artistId) {
      this.loadArtist();
    }
  }

  loadArtist() {
    this.isLoading = true;

    this.artistService.getArtistById(this.artistId!).subscribe({
      next: artist => {
        if (artist.photo) {
          this.previewImage = 'data:image/jpeg;base64,' + artist.photo;
          this.selectedFileName = 'uploaded-image.jpg';
          this.isFileLoaded = true;
        }

        this.artistForm.patchValue({
          id: artist.id,
          firstName: artist.firstName,
          lastName: artist.lastName,
          category: artist.category,
          description: artist.description,
          photo: artist.photo
        });

        setTimeout(() => {
          this.artistForm.get('description')?.setValue(artist.description);
          this.isLoading = false;
        });
      },
      error: () => {
        this.snack.open("Błąd podczas pobierania artysty", "Zamknij", {duration: 3000});
        this.isLoading = false;
      }
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
      this.previewImage = "data:image/jpeg;base64," + base64;
      this.isFileLoaded = true;
    };
    reader.readAsDataURL(file);
  }

  onDeleteImage() {
    this.selectedFileName = null;
    this.previewImage = null;
    this.isFileLoaded = false;
    this.artistForm.patchValue({ photo: null });
  }

  saveArtist() {
    if (this.artistForm.invalid) return;

    this.isLoading = true;
    const dto = this.artistForm.value;
    const request = this.artistService.updateArtist(dto);

    request.subscribe({
      next: () => {
        this.snack.open("Zapisano pomyślnie", "Zamknij", {duration: 3000});
        this.router.navigate(['../..'], { relativeTo: this.route });
      },
      error: () => {
        this.snack.open("Błąd podczas zapisywania", "Zamknij", {duration: 3000});
        this.isLoading = false;
      }
    });
  }

  cancel() {
    this.router.navigate(['../..'], { relativeTo: this.route });
  }
}
