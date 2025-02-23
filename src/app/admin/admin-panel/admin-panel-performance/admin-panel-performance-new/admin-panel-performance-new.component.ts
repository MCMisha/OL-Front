import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {AdminPerformanceService} from "../../../../services/admin/admin-performance.service";
import {AdminPlaceService} from "../../../../services/admin/admin-place.service";
import {AdminGenreService} from "../../../../services/admin/admin-genre.service";
import {Performance} from "../../../../models/performance";
import {Place} from "../../../../models/place";
import {Genre} from "../../../../models/genre";

@Component({
  selector: 'app-admin-panel-performance-new',
  templateUrl: './admin-panel-performance-new.component.html',
  styleUrl: './admin-panel-performance-new.component.scss'
})
export class AdminPanelPerformanceNewComponent implements OnInit, OnDestroy {
  newPerformanceForm!: FormGroup;
  existingPerformances: Performance[] = [];
  subscription = new Subscription();
  mainImage = 'data:image/jpeg;base64,';
  poster = 'data:image/jpeg;base64,';
  places: Place[] = [];
  genres: Genre[] = [];
  durations: string[] = ['0:30', '1:00', '1:30', '1:40', '2:00', '2:30', '3:00'];
  breaksCount = [0, 1, 2, 3];
  selectedFiles: { mainImage: string | undefined; poster: string | undefined } = { mainImage: undefined, poster: undefined };
  selectedFileNames: { mainImage: string | undefined; poster: string | undefined } = { mainImage: undefined, poster: undefined };
  isFileLoaded = { mainImage: false, poster: false };
  isLoading: boolean = true;

  constructor(private performanceService: AdminPerformanceService,
              private placeService: AdminPlaceService,
              private genreService: AdminGenreService,
              private fb: FormBuilder,
              protected router: Router,
              protected route: ActivatedRoute) {}

  ngOnInit() {
    this.subscription.add(this.placeService.getPlaces().subscribe(places => this.places = places));
    this.subscription.add(this.genreService.getGenres().subscribe(genres => this.genres = genres));
    this.subscription.add(this.performanceService.getPerformances().subscribe(performances => {
      this.existingPerformances = performances;
      this.isLoading = false;
    }));
    this.newPerformanceForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      genre: ['', [Validators.required]],
      place: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      breaksCount: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(5000)]],
      mainImage: [null, [Validators.required]],
      poster: [null, [Validators.required]]
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
        if (field === 'mainImage') {
          this.mainImage += this.selectedFiles[field];
        }else {
          this.poster += this.selectedFiles[field];
        }
        this.isFileLoaded[field] = true;
        this.newPerformanceForm.patchValue({ [field]: file.name });
        this.newPerformanceForm.get(field)?.updateValueAndValidity();
      };
    }
  }

  savePerformance() {
    if (this.newPerformanceForm.invalid) {
      console.error("Form is invalid or file is still loading!");
      return;
    }

    const performanceData = {
      title: this.newPerformanceForm.value.title,
      genre: this.newPerformanceForm.value.genre,
      place: this.newPerformanceForm.value.place,
      duration: this.newPerformanceForm.value.duration,
      breaksCount: this.newPerformanceForm.value.breaksCount,
      description: this.newPerformanceForm.value.description,
      mainImage: this.selectedFiles.mainImage,
      poster: this.selectedFiles.poster
    };

    this.performanceService.createPerformance(performanceData).subscribe(() => {
      this.router.navigate(['..'], { relativeTo: this.route });
    });
  }
}
