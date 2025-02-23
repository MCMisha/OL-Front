import {Component, OnDestroy, OnInit} from '@angular/core';
import {Genre} from "../../../../models/genre";
import {Subscription, Observable} from "rxjs";
import {FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors} from '@angular/forms';
import {map} from 'rxjs/operators';
import {ActivatedRoute, Router} from "@angular/router";
import {AdminGenreService} from "../../../../services/admin/admin-genre.service";

@Component({
  selector: 'app-admin-panel-genre-new',
  templateUrl: './admin-panel-genre-new.component.html',
  styleUrls: ['./admin-panel-genre-new.component.scss']
})
export class AdminPanelGenreNewComponent implements OnInit, OnDestroy {
  newGenreForm!: FormGroup;
  existingGenres: Genre[] = [];
  subscription = new Subscription();
  isLoading: boolean = true;

  constructor(private genreService: AdminGenreService,
              private fb: FormBuilder,
              protected router: Router,
              protected route: ActivatedRoute) {
  }

  ngOnInit() {
    this.newGenreForm = this.fb.group({
      genreName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
        [this.genreExistsValidator.bind(this)]],
    });

    this.subscription.add(
      this.genreService.getGenres().subscribe(genres => {
        this.existingGenres = genres;
        this.isLoading = false;
      })
    );

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  genreExistsValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.genreService.getGenres().pipe(
      map(genres => {
        const genreExists = genres.some(genre => genre.name.toLowerCase() === control.value.toLowerCase());
        return genreExists ? {genreExists: true} : null;
      })
    );
  }

  saveGenre() {
    if (this.newGenreForm.valid) {
      const newGenreName = this.newGenreForm.value.genreName;
      this.genreService.createGenre({id: 0, name: newGenreName}).subscribe(() => {
        this.router.navigate(['..'], {relativeTo: this.route});
      });
    }
  }
}
