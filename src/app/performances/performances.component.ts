import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, Subscription, takeUntil} from "rxjs";
import {PerformancesService} from "../services/performances.service";
import {Performance} from "../models/performance";
import {GenreService} from "../services/genre.service";
import {Genre} from "../models/genre";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-performances',
  templateUrl: './performances.component.html',
  styleUrl: './performances.component.scss'
})
export class PerformancesComponent implements OnInit, OnDestroy {
  performances: Performance[] = [];
  paginatedPerformances: Performance[] = [];

  genres: Genre[] = [];
  private subscription = new Subscription();
  private $destroy = new Subject();
  isLoading = false;
  pageSize = 2;
  pageIndex = 0;

  constructor(private genreService: GenreService, private performancesService: PerformancesService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.subscription.add(
      this.performancesService.getPerformances().pipe(takeUntil(this.$destroy)).subscribe(performances => {
        this.performances = performances;
        this.updatePaginatedPerformances();
      })
    );
    this.subscription.add(
      this.genreService.getGenres().pipe(takeUntil(this.$destroy)).subscribe(genres => {
        this.genres = genres;
        this.isLoading = false;
      })
    );
  }

  getGenreNameById(id?: number) {
    const matchingGenre = this.genres.find(g => g.id === id)?.name;
    return matchingGenre ?? '';
  }

  updatePaginatedPerformances() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedPerformances = this.performances.slice(start, end);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedPerformances();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
