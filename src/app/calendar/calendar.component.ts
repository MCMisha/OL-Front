import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { isSameDay } from 'date-fns';
import { MatPaginator } from '@angular/material/paginator';
import { MatCalendar } from '@angular/material/datepicker';
import { Subject, takeUntil } from 'rxjs';
import { Performance } from '../models/performance';
import { Genre } from '../models/genre';
import { EventInstanceInfo } from "../models/event-instance-info";
import { EventService } from '../services/event.service';
import { PerformancesService } from '../services/performances.service';
import { GenreService } from '../services/genre.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, AfterViewInit, OnDestroy {
  selectedDate: Date | null = null;
  eventsByDate: EventInstanceInfo[] = [];
  minDate: Date | null = null;
  maxDate: Date | null = null;
  events: Performance[] = [];
  genres: Genre[] = [];
  pageSize = 1;
  paginatedEvents: EventInstanceInfo[] = [];
  performanceDatesTickets: EventInstanceInfo[] = [];

  private destroy$ = new Subject<void>();
  isLoading: boolean = true;
  currentLoadedMonth: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatCalendar) calendar!: MatCalendar<Date>;

  constructor(
    private eventService: EventService,
    private performancesService: PerformancesService,
    private genreService: GenreService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.eventService.getMinMaxDates()
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.minDate = new Date(res.minDate);
        this.maxDate = new Date(res.maxDate);
        this.selectedDate = new Date(res.minDate);
        this.calendar.activeDate = this.selectedDate;
        this.cdr.detectChanges();
        this.calendar.updateTodaysDate();
        this.currentLoadedMonth = '';

        this.loadMonthData(this.minDate);
      });
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.paginator.page.pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.updatePaginatedEvents();
      });
    }

    this.calendar.stateChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      const activeDate = this.calendar.activeDate;
      const newMonth = `${activeDate.getFullYear()}-${String(activeDate.getMonth() + 1).padStart(2, '0')}`;

      if (this.minDate && this.maxDate) {
        const current = new Date(activeDate.getFullYear(), activeDate.getMonth(), 1);
        const min = new Date(this.minDate.getFullYear(), this.minDate.getMonth(), 1);
        const max = new Date(this.maxDate.getFullYear(), this.maxDate.getMonth(), 1);

        if (current >= min && current <= max && newMonth !== this.currentLoadedMonth) {
          this.loadMonthData(activeDate);
        }
      }
    });
  }

  onMonthChange(date: Date): void {
    if (!this.minDate || !this.maxDate) return;

    const current = new Date(date.getFullYear(), date.getMonth(), 1);
    const min = new Date(this.minDate.getFullYear(), this.minDate.getMonth(), 1);
    const max = new Date(this.maxDate.getFullYear(), this.maxDate.getMonth(), 1);

    if (current < min || current > max) return;

    const newMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    if (newMonth !== this.currentLoadedMonth) {
      this.loadMonthData(date);
    }
  }

  onDateChange(date: Date | null): void {
    this.selectedDate = date;

    if (!date) {
      this.eventsByDate = [];
    } else {
      const selected = this.selectedDate;
      this.eventsByDate = this.performanceDatesTickets.filter(p =>
        isSameDay(new Date(p.dateTime), selected!)
      );
    }

    this.paginator?.firstPage();
    this.updatePaginatedEvents();
  }

  private loadMonthData(date: Date) {
    if (!this.minDate || !this.maxDate) return;

    const current = new Date(date.getFullYear(), date.getMonth(), 1);
    const min = new Date(this.minDate.getFullYear(), this.minDate.getMonth(), 1);
    const max = new Date(this.maxDate.getFullYear(), this.maxDate.getMonth(), 1);
    if (current < min || current > max) return;

    const month = String(date.getMonth() + 1).padStart(2, '0');
    const yearMonth = `${date.getFullYear()}-${month}`;
    this.currentLoadedMonth = yearMonth;

    this.isLoading = true;

    this.eventService.getEventDates(yearMonth)
      .pipe(takeUntil(this.destroy$))
      .subscribe((dates: EventInstanceInfo[]) => {
        this.performanceDatesTickets = dates;

        this.genreService.getGenres()
          .pipe(takeUntil(this.destroy$))
          .subscribe(genres => {
            this.genres = genres;
            this.cdr.detectChanges();
          });

        this.performancesService.getPerformances()
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: Performance[]) => {
            this.events = data.map((event: Performance) => ({
              ...event,
              date: undefined
            }));

            this.onDateChange(this.selectedDate ?? new Date());
            this.isLoading = false;
            this.cdr.detectChanges();
            this.calendar.updateTodaysDate();
          });
      });
  }

  private updatePaginatedEvents(): void {
    if (!this.paginator) return;
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    this.paginatedEvents = this.eventsByDate.slice(startIndex, endIndex);
    this.cdr.detectChanges();
  }

  dateClass = (date: Date): string => {
    const currentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return this.performanceDatesTickets.some(eventDate =>
      isSameDay(new Date(eventDate.dateTime), currentDate)
    )
      ? 'event-day'
      : '';
  };

  getGenreName(genre: number | undefined): string {
    if (genre === undefined) return '';
    const found = this.genres.find(g => g.id === genre);
    return found?.name ?? '';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
