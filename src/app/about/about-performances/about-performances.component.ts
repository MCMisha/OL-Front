import {Component, OnDestroy, OnInit} from '@angular/core';
import {Genre} from "../../models/genre";
import {PerformancesService} from "../../services/performances.service";
import {GenreService} from "../../services/genre.service";
import {Subscription} from "rxjs";
import {PerformanceEventService} from "../../services/performance-event.service";
import {PerformanceListAbout} from "../../models/performance-list-about";
import {HelperFunctionsUtil} from "../../shared/utils/helper-functions.util";
import {Router} from "@angular/router";

type SortType = 'titleAsc' | 'titleDesc' | 'newest' | 'oldest';

@Component({
  selector: 'app-about-performances',
  templateUrl: './about-performances.component.html',
  styleUrl: './about-performances.component.scss'
})
export class AboutPerformancesComponent implements OnInit, OnDestroy {
  genresForFilter = ['Wszystkie', 'Opera', 'Operetka', 'Bajka', 'Balet', 'Koncert'];
  selectedFilter = this.genresForFilter[0];
  performances: PerformanceListAbout[] = [];
  filteredPerformances: PerformanceListAbout[] = [];
  isLoading = true;
  subscription = new Subscription();
  genres: Genre[] = [];
  sortOptions: { label: string; value: SortType }[] = [
    { label: 'Alfabetycznie A-Z', value: 'titleAsc' },
    { label: 'Alfabetycznie Z-A', value: 'titleDesc' },
    { label: 'Od najnowszych', value: 'newest' },
    { label: 'Od najstarszych', value: 'oldest' }
  ];

  selected = this.sortOptions[0];

  selectedSort: SortType = 'titleAsc';
  constructor(private performanceService: PerformancesService,
              private genreService: GenreService,
              protected helperFunctions: HelperFunctionsUtil,
              private router: Router,
              private performanceEventService: PerformanceEventService) {
  }

  ngOnInit() {
    this.subscription.add(
      this.performanceService.getPerformancesForAbout().subscribe(res => {
        this.performances = res;
        this.filteredPerformances = this.performances;
      })
    )
    this.subscription.add(
      this.genreService.getGenres().subscribe(res => {
        this.genres = res;
        this.isLoading = false;
      })
    )
  }


  private sortStrategies: Record<SortType, (a: any, b: any) => number> = {
    titleAsc: (a, b) =>
      a.title.localeCompare(b.title, 'pl', { sensitivity: 'base' }),

    titleDesc: (a, b) =>
      b.title.localeCompare(a.title, 'pl', { sensitivity: 'base' }),

    newest: (a, b) =>
      this.getDateTime(b.premiereDate) - this.getDateTime(a.premiereDate),

    oldest: (a, b) =>
      this.getDateTime(a.premiereDate) - this.getDateTime(b.premiereDate)
  };

  sortPerformances() {
    this.filteredPerformances.filter(p => p.genre === this.selectedFilter);
    const strategy = this.sortStrategies[this.selectedSort];
    this.filteredPerformances = this.filteredPerformances.sort(strategy);
  }

  private getDateTime(date: string | Date | null | undefined): number {
    return date ? new Date(date).getTime() : 0;
  }

  changeSelectedGenre(genre: string): void {
    this.selectedFilter = genre;
    if (genre !== this.genresForFilter[0]) {
      this.filteredPerformances = this.performances.filter(p => p.genre === this.selectedFilter);
    } else {
      this.filteredPerformances = this.performances;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  get selectedSortLabel(): string {
    return this.sortOptions.find(o => o.value === this.selectedSort)?.label ?? '';
  }

  protected goToPerformancePage(id: number) {
    this.router.navigate(['/performances/details', id]);
  }
}
