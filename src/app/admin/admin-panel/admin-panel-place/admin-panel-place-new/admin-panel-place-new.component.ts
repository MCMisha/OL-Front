import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {map} from "rxjs/operators";
import {Place} from "../../../../models/place";
import {AdminPlaceService} from "../../../../services/admin/admin-place.service";

@Component({
  selector: 'app-admin-panel-place-new',
  templateUrl: './admin-panel-place-new.component.html',
  styleUrl: './admin-panel-place-new.component.scss'
})
export class AdminPanelPlaceNewComponent implements OnInit, OnDestroy {
  newPlaceForm!: FormGroup;
  existingPlaces: Place[] = [];
  subscription = new Subscription();

  constructor(private placeService: AdminPlaceService,
              private fb: FormBuilder,
              protected router: Router,
              protected route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription.add(
      this.placeService.getPlaces().subscribe(places => {
        this.existingPlaces = places;
      })
    );

    this.newPlaceForm = this.fb.group({
      placeName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
        [this.placeExistsValidator.bind(this)]],
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  placeExistsValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.placeService.getPlaces().pipe(
      map(places => {
        const placeExists = places.some(genre => genre.name.toLowerCase() === control.value.toLowerCase());
        return placeExists ? {placeExists: true} : null;
      })
    );
  }

  savePlace() {
    if (this.newPlaceForm.valid) {
      const newPlaceName = this.newPlaceForm.value.placeName;
      this.placeService.createPlace({id: 0, name: newPlaceName, performances: []}).subscribe(() => {
        this.router.navigate(['..'], {relativeTo: this.route});
      });
    }
  }
}
