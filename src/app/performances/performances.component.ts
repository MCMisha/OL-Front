import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Performance} from "../models/performance";
import {isSameDay} from 'date-fns';
import {MatPaginator} from '@angular/material/paginator';
import {MatCalendar} from '@angular/material/datepicker';
import {PerformancesService} from "../services/performances.service";
import {Subject, takeUntil} from "rxjs";
import {EventService} from "../services/event.service";
import {PerformanceDatesTicket} from "../models/performance-dates-ticket";
import {Genre} from "../models/genre";

@Component({
  selector: 'app-performances',
  templateUrl: './performances.component.html',
  styleUrls: ['./performances.component.scss']
})
export class PerformancesComponent implements OnInit, AfterViewInit, OnDestroy {
  selectedDate: Date | null = null;
  eventsByDate: Performance[] = [];
  minDate: Date = new Date(2021, 9, 1);
  maxDate: Date = new Date(2025, 0, 30);
  events: Performance[] = [];
  genres: Genre[] = [];
  pageSize = 1; // Number of items per page
  paginatedEvents: Performance[] = []; // Events to display on the current page
  performanceDatesTickets: PerformanceDatesTicket[] = []; // Preloaded event dates
  private destroy$ = new Subject<void>();
  dateClass = (date: Date): string => {
    if (this.performanceDatesTickets.length === 0) {
      return '';
    }

    const currentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return this.performanceDatesTickets.some(eventDate => {
      return isSameDay(eventDate.dateTimePerformance, currentDate);
    })
      ? 'event-day'
      : '';
  };
  isLoading: any = true;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatCalendar) calendar!: MatCalendar<Date>;

  constructor(
    private performancesService: PerformancesService,
    private eventDatesService: EventService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.eventDatesService.getEventDates()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (dates: PerformanceDatesTicket[]) => {
          this.performanceDatesTickets = dates;
          this.cdr.detectChanges();
          this.calendar.updateTodaysDate();
          this.selectedDate = new Date();

          this.eventDatesService.getGenre()
            .pipe(takeUntil(this.destroy$))
            .subscribe(
              (genres: any[]) => {
                this.genres = genres;
                this.cdr.detectChanges();
              },
              error => console.error('Error loading genres:', error)
            );

          this.performancesService.getPerformances()
            .pipe(takeUntil(this.destroy$))
            .subscribe(
              (data: Performance[]) => {
                this.events = data.map((event: Performance) => {
                  const matchingDate = this.performanceDatesTickets.find(
                    performance => performance.performanceId === event.id
                  )?.dateTimePerformance;

                  return {
                    ...event,
                    date: matchingDate ? new Date(matchingDate) : undefined,
                  };
                });
                this.cdr.detectChanges();
                this.isLoading = false;
              },
              error => console.error('Error loading performances:', error)
            );
        },
        error => console.error('Error loading event dates:', error)
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.paginator.page.pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.updatePaginatedEvents();
      });
    } else {
      console.error('Paginator is not initialized.');
    }
  }



  onDateChange(date: Date | null): void {
    this.selectedDate = date;
    if (this.selectedDate) {
      this.eventsByDate = this.events.filter(event => {
        return this.performanceDatesTickets.some(performanceDate => {
          return performanceDate.performanceId === event.id &&
            isSameDay(new Date(performanceDate.dateTimePerformance), this.selectedDate!);
        });
      });
    } else {
      this.eventsByDate = [];
    }
    this.paginator?.firstPage();
    this.updatePaginatedEvents();
  }

  private updatePaginatedEvents(): void {
    if (!this.paginator) {
      console.error('Paginator is not initialized.');
      return;
    }
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    this.paginatedEvents = this.eventsByDate.slice(startIndex, endIndex);
    this.cdr.detectChanges();
  }

  getGenreName(genre: number | undefined) {
    if (genre === undefined) {
      return '';
    }
    const matchingGenre = this.genres.find(g => g.id === genre)?.name;
    return matchingGenre ?? '';
  }
}
