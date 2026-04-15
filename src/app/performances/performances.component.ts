import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { GenreService } from '../services/genre.service';
import { Genre } from '../models/genre';
import { PerformanceEventService } from '../services/performance-event.service';
import { PerformanceEvent } from '../models/performance-event';
import {MonthItem} from "../models/month-item";
import {HelperFunctionsUtil} from "../shared/utils/helper-functions.util";

@Component({
  selector: 'app-performances',
  templateUrl: './performances.component.html',
  styleUrl: './performances.component.scss'
})
export class PerformancesComponent implements OnInit, OnDestroy {
  performances: PerformanceEvent[] = [];
  genres: Genre[] = [];
  months: MonthItem[] = [];
  activeMonth = '';
  isLoading = false;

  private subscription = new Subscription();
  private readonly destroy$ = new Subject<void>();

  constructor(
    private genreService: GenreService,
    private performanceEventService: PerformanceEventService,
    protected helperFunctions: HelperFunctionsUtil
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.loadGenres();
    this.loadMonthsAndInitialData();
  }

  private loadGenres(): void {
    this.subscription.add(
      this.genreService
        .getGenres()
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (genres) => {
            this.genres = genres;
          },
          error: (error) => {
            console.error('Błąd pobierania gatunków', error);
          }
        })
    );
  }

  private loadMonthsAndInitialData(): void {
    this.subscription.add(
      this.performanceEventService
        .getMinMaxDates()
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (range) => {
            this.months = this.buildMonths(range.minDate, range.maxDate);

            if (this.months.length > 0) {
              this.activeMonth = this.getCurrentOrLastAvailableMonth(this.months);
              this.loadPerformancesByMonth(this.activeMonth);
            } else {
              this.isLoading = false;
            }
          },
          error: (error) => {
            console.error('Błąd pobierania zakresu miesięcy', error);
            this.isLoading = false;
          }
        })
    );
  }

  loadPerformancesByMonth(month: string): void {
    if (!month || (this.activeMonth === month && !this.isLoading)) {
      return;
    }

    this.activeMonth = month;
    this.performances = [];
    this.isLoading = true;

    this.subscription.add(
      this.performanceEventService
        .getByMonth(month)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (performances) => {
            this.performances = performances;
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Błąd pobierania wydarzeń dla miesiąca', error);
            this.performances = [];
            this.isLoading = false;
          }
        })
    );
  }

  trackByMonth(_: number, item: MonthItem): string {
    return item.value;
  }

  getMonthLabelPl(date: Date): string {
    return date
      .toLocaleDateString('pl-PL', { month: 'long' })
      .toUpperCase();
  }

  get visibleMonths(): MonthItem[] {
    const isMobile = window.innerWidth <= 768;
    const index = this.months.findIndex(m => m.value === this.activeMonth);

    if (index === -1) {
      return this.months.slice(0, isMobile ? 2 : 7);
    }

    if (isMobile) {
      if (index === this.months.length - 1) {
        return this.months.slice(Math.max(index - 1, 0), index + 1);
      }

      return this.months.slice(index, index + 2);
    }

    const total = 7;
    let start = index - 3;
    let end = start + total;

    if (start < 0) {
      start = 0;
      end = total;
    }

    if (end > this.months.length) {
      end = this.months.length;
      start = end - total;
    }

    return this.months.slice(start, end);
  }

  getPerformanceBackground(mainImage?: string): string {
    if (!mainImage) {
      return `linear-gradient(
        90deg,
        rgba(0, 0, 0, 0.92) 0%,
        rgba(0, 0, 0, 0.7) 24%,
        rgba(0, 0, 0, 0.25) 58%,
        rgba(0, 0, 0, 0.8) 100%
      )`;
    }

    return `linear-gradient(
        90deg,
        rgba(0, 0, 0, 0.92) 0%,
        rgba(0, 0, 0, 0.7) 24%,
        rgba(0, 0, 0, 0.25) 58%,
        rgba(0, 0, 0, 0.8) 100%
      ),
      url(data:image/jpeg;base64,${mainImage}) center 70% / cover no-repeat`;
  }
  get activeMonthIndex(): number {
    return this.months.findIndex(m => m.value === this.activeMonth);
  }

  get canGoPrevious(): boolean {
    return this.activeMonthIndex > 0;
  }

  get canGoNext(): boolean {
    return this.activeMonthIndex < this.months.length - 1;
  }

  showPreviousMonth(): void {
    const index = this.activeMonthIndex;
    if (index > 0) {
      this.loadPerformancesByMonth(this.months[index - 1].value);
    }
  }

  showNextMonth(): void {
    const index = this.activeMonthIndex;
    if (index < this.months.length - 1) {
      this.loadPerformancesByMonth(this.months[index + 1].value);
    }
  }

  private buildMonths(minDate: Date, maxDate: Date): MonthItem[] {
    const result: MonthItem[] = [];

    const start = new Date(minDate);
    const end = new Date(maxDate);

    const current = new Date(start.getFullYear(), start.getMonth(), 1);
    const last = new Date(end.getFullYear(), end.getMonth(), 1);

    while (current <= last) {
      const year = current.getFullYear();
      const month = current.getMonth() + 1;

      result.push({
        value: `${year}-${String(month).padStart(2, '0')}`,
        label: this.getMonthLabelPl(new Date(year, month - 1, 1)),
        date: new Date(year, month - 1, 1)
      });

      current.setMonth(current.getMonth() + 1);
    }

    return result;
  }

  private getCurrentOrLastAvailableMonth(months: MonthItem[]): string {
    const now = new Date();
    const currentValue = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const exact = months.find(m => m.value === currentValue);

    return exact ? exact.value : months[months.length - 1].value;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.subscription.unsubscribe();
  }
}
