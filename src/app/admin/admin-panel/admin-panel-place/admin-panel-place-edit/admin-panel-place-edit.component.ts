import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {map, switchMap} from "rxjs/operators";
import {Place} from "../../../../models/place";
import {AdminPlaceService} from "../../../../services/admin/admin-place.service";
import {Performance} from "../../../../models/performance";

@Component({
  selector: 'app-admin-panel-place-edit',
  templateUrl: './admin-panel-place-edit.component.html',
  styleUrl: './admin-panel-place-edit.component.scss'
})
export class AdminPanelPlaceEditComponent implements OnInit, OnDestroy {
  editPlaceForm!: FormGroup;
  existingPlaces: Place[] = [];
  subscription = new Subscription();
  currentPlaceId!: number;
  placePerformances: Performance[] = [];
  isLoading = false;

  constructor(
    private placeService: AdminPlaceService,
    private fb: FormBuilder,
    protected router: Router,
    protected route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isLoading = true;

    this.subscription.add(
      this.route.params
        .pipe(
          switchMap(params => {
            this.currentPlaceId = +params['id']; // Получаем ID жанра из параметров маршрута
            return this.placeService.getPlaces();
          })
        )
        .subscribe(places => {
          this.existingPlaces = places;
          const currentPlace = places.find(genre => genre.id === this.currentPlaceId);

          if (currentPlace) {
            this.placePerformances = currentPlace.performances;
            this.editPlaceForm = this.fb.group({
              placeName: [
                currentPlace.name,
                [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
                [this.genreExistsValidator.bind(this)],
              ],
            });
          }
          this.isLoading = false;
        })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  genreExistsValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.placeService.getPlaces().pipe(
      map(places => {
        const placeExists = places.some(
          place =>
            place.name.toLowerCase() === control.value.toLowerCase() &&
            place.id !== this.currentPlaceId
        );
        return placeExists ? { placeExists: true } : null;
      })
    );
  }

  savePlace() {
    if (this.editPlaceForm.valid) {
      const updatedPlaceName = this.editPlaceForm.value.placeName;
      this.placeService.updatePlace({ id: this.currentPlaceId, name: updatedPlaceName, performances: this.placePerformances }).subscribe(() => {
        this.router.navigate(['../..'], { relativeTo: this.route });
      });
    }
  }
}
