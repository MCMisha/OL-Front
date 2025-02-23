import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {forkJoin, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {AdminPerformanceService} from "../../../../services/admin/admin-performance.service";
import {AdminPlaceService} from "../../../../services/admin/admin-place.service";
import {AdminGenreService} from "../../../../services/admin/admin-genre.service";
import {Performance} from "../../../../models/performance";
import {Place} from "../../../../models/place";
import {Genre} from "../../../../models/genre";

@Component({
  selector: 'app-admin-panel-performance-edit',
  templateUrl: './admin-panel-performance-edit.component.html',
  styleUrl: './admin-panel-performance-edit.component.scss'
})
export class AdminPanelPerformanceEditComponent implements OnInit, OnDestroy {
  editPerformanceForm!: FormGroup;
  existingPerformances: Performance[] = [];
  mainImage = 'data:image/jpeg;base64,';
  poster = 'data:image/jpeg;base64,';
  subscription = new Subscription();
  places: Place[] = [];
  genres: Genre[] = [];
  durations: string[] = ['0:30', '1:00', '1:30', '1:40', '2:00', '2:30', '3:00'];
  breaksCount = [0, 1, 2, 3];
  selectedFiles: { mainImage: string | undefined; poster: string | undefined } = { mainImage: undefined, poster: undefined };
  selectedFileNames: { mainImage: string | undefined; poster: string | undefined } = { mainImage: undefined, poster: undefined };
  isFileLoaded = { mainImage: false, poster: false };

  constructor(private performanceService: AdminPerformanceService,
              private placeService: AdminPlaceService,
              private genreService: AdminGenreService,
              private fb: FormBuilder,
              protected router: Router,
              protected route: ActivatedRoute) {}

  ngOnInit() {
    this.editPerformanceForm = this.fb.group({
      id: [''],
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      genre: ['', [Validators.required]],
      place: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      breaksCount: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(5000)]],
      mainImage: [null, [Validators.required]],
      poster: [null, [Validators.required]]
    }, { updateOn: 'blur' });

    const performanceId = +this.route.snapshot.paramMap.get('id')!;
    if (performanceId) {
      forkJoin({
        places: this.placeService.getPlaces(),
        genres: this.genreService.getGenres(),
        performance: this.performanceService.getPerformanceById(performanceId)
      }).subscribe(({ places, genres, performance }) => {
        this.places = places;
        this.genres = genres;

        if (performance) {
          this.editPerformanceForm.patchValue({
            id: performance.id,
            title: performance.title,
            genre: performance.genre,
            place: performance.place,
            duration: this.durations.includes(performance.duration!.substring(1, 5))
              ? performance.duration?.substring(1, 5)
              : '',
            breaksCount: this.breaksCount.includes(Number(performance.breaksCount))
              ? Number(performance.breaksCount)
              : '',
            description: performance.description
          });

          Object.keys(this.editPerformanceForm.controls).forEach(field => {
            this.editPerformanceForm.get(field)?.updateValueAndValidity();
          });
          this.mainImage += performance.mainImage;
          this.updateFileState('mainImage', performance.mainImage, 'Uploaded Image');
          this.poster += performance.poster;
          this.updateFileState('poster', performance.poster, 'Uploaded Poster');

          this.selectedFiles.mainImage = performance.mainImage;
          this.selectedFiles.poster = performance.poster;
          this.selectedFileNames.mainImage = performance.mainImage ? 'Uploaded Image' : undefined;
          this.selectedFileNames.poster = performance.poster ? 'Uploaded Poster' : undefined;
          this.isFileLoaded.mainImage = !!performance.mainImage;
          this.isFileLoaded.poster = !!performance.poster;
        }
      });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  updateFileState(field: 'mainImage' | 'poster', fileData: string | undefined, fileName: string) {
    if (fileData) {
      this.selectedFiles[field] = fileData;
      this.selectedFileNames[field] = fileName;
      this.isFileLoaded[field] = true;
      this.editPerformanceForm.patchValue({ [field]: fileName });
      this.editPerformanceForm.get(field)?.updateValueAndValidity();
    }
  }

  onFileSelected(event: Event, field: 'mainImage' | 'poster') {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFileNames[field] = file.name;
      this.isFileLoaded[field] = false;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.selectedFiles[field] = (reader.result as string).split(',')[1];
        this.isFileLoaded[field] = true;
        this.editPerformanceForm.patchValue({ [field]: file.name });
        this.editPerformanceForm.get(field)?.updateValueAndValidity();
      };
    }
  }

  savePerformance() {
    if (this.editPerformanceForm.invalid) {
      console.error("Form is invalid or file is still loading!");
      return;
    }

    const performanceData = {
      id: this.editPerformanceForm.value.id,
      title: this.editPerformanceForm.value.title,
      genre: this.editPerformanceForm.value.genre,
      place: this.editPerformanceForm.value.place,
      duration: this.editPerformanceForm.value.duration,
      breaksCount: this.editPerformanceForm.value.breaksCount,
      description: this.editPerformanceForm.value.description,
      mainImage: this.selectedFiles.mainImage,
      poster: this.selectedFiles.poster
    };

    this.performanceService.updatePerformance(performanceData).subscribe(() => {
      this.router.navigate(['../..'], { relativeTo: this.route });
    });
  }
}
