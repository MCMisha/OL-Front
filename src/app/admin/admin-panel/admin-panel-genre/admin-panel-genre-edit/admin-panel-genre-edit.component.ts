import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { Genre } from "../../../../models/genre";
import { Observable, Subscription } from "rxjs";
import { GenreService } from "../../../../services/genre.service";
import { ActivatedRoute, Router } from "@angular/router";
import { map, switchMap } from "rxjs/operators";

@Component({
  selector: 'app-admin-panel-genre-edit',
  templateUrl: './admin-panel-genre-edit.component.html',
  styleUrls: ['./admin-panel-genre-edit.component.scss']
})
export class AdminPanelGenreEditComponent implements OnInit, OnDestroy {
  editGenreForm!: FormGroup;
  existingGenres: Genre[] = [];
  subscription = new Subscription();
  currentGenreId!: number;
  isLoading = false;

  constructor(
    private genreService: GenreService,
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
            this.currentGenreId = +params['id']; // Получаем ID жанра из параметров маршрута
            return this.genreService.getGenres();
          })
        )
        .subscribe(genres => {
          this.existingGenres = genres;
          const currentGenre = genres.find(genre => genre.id === this.currentGenreId);

          if (currentGenre) {
            this.editGenreForm = this.fb.group({
              genreName: [
                currentGenre.name,
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
    return this.genreService.getGenres().pipe(
      map(genres => {
        const genreExists = genres.some(
          genre =>
            genre.name.toLowerCase() === control.value.toLowerCase() &&
            genre.id !== this.currentGenreId // Исключаем текущий редактируемый жанр
        );
        return genreExists ? { genreExists: true } : null;
      })
    );
  }

  saveGenre() {
    if (this.editGenreForm.valid) {
      const updatedGenreName = this.editGenreForm.value.genreName;
      this.genreService.updateGenre({ id: this.currentGenreId, name: updatedGenreName }).subscribe(() => {
        this.router.navigate(['../..'], { relativeTo: this.route });
      });
    }
  }
}
