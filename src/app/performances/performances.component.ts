import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, Subscription, takeUntil} from "rxjs";
import {PerformancesService} from "../services/performances.service";
import {Performance} from "../models/performance";
import {GenreService} from "../services/genre.service";
import {Genre} from "../models/genre";

@Component({
  selector: 'app-performances',
  templateUrl: './performances.component.html',
  styleUrl: './performances.component.scss'
})
export class PerformancesComponent implements OnInit, OnDestroy {
  performances: Performance[] = [];
  genres: Genre[] = [];
  private subscription = new Subscription();
  private $destroy = new Subject();

  constructor(private genreService: GenreService, private performancesService: PerformancesService) {
  }

  ngOnInit(): void {
    this.subscription.add(
      this.performancesService.getPerformances().pipe(takeUntil(this.$destroy)).subscribe(performances => {
        this.performances = performances;
      })
    );
    this.subscription.add(
      this.genreService.getGenres().pipe(takeUntil(this.$destroy)).subscribe(genres => this.genres = genres)
    );

  }

  getGenreNameById(id?: number) {
    const matchingGenre = this.genres.find(g => g.id === id)?.name;
    return matchingGenre ?? '';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
