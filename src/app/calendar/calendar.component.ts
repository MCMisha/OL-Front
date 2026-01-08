import {
  AfterViewInit,
  ChangeDetectorRef,
  Component, ElementRef,
  OnDestroy,
  OnInit, QueryList,
  ViewChild, ViewChildren
} from '@angular/core';
import {isSameDay} from 'date-fns';
import {MatPaginator} from '@angular/material/paginator';
import {Subject, takeUntil} from 'rxjs';
import {Performance} from '../models/performance';
import {Genre} from '../models/genre';
import {EventInstanceInfo} from "../models/event-instance-info";
import {EventService} from '../services/event.service';
import {PerformancesService} from '../services/performances.service';
import {GenreService} from '../services/genre.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, AfterViewInit, OnDestroy {
  days = Array.from({length: 31}, (_, i) => i + 1);
  activeDay = new Date().getUTCDate();
  // польские названия месяцев (как в макете)
  private readonly monthNamesPL = [
    'STYCZEŃ', 'LUTY', 'MARZEC', 'KWIECIEŃ', 'MAJ', 'CZERWIEC',
    'LIPIEC', 'SIERPIEŃ', 'WRZESIEŃ', 'PAŹDZIERNIK', 'LISTOPAD', 'GRUDZIEŃ'
  ];
  cardX = 0;

  @ViewChild('daysWrap', { read: ElementRef }) daysWrap!: ElementRef<HTMLElement>;
  @ViewChildren('dayEl', { read: ElementRef }) dayEls!: QueryList<ElementRef<HTMLElement>>;

  // месяцы без спектаклей (0=янв ... 6=июль, 7=август)
  private readonly noPerformMonths = new Set<number>([6, 7]);
  selectedEvents: any;
  currentMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  monthLabel = ''; // например: "PAŹDZIERNIK"
  selectedDate: Date | null = null;
  eventsByDate: EventInstanceInfo[] = [];
  minDate: Date | null = new Date(2021, 1, 1);
  maxDate: Date | null = null;
  events: Performance[] = [];
  genres: Genre[] = [];
  pageSize = 1;
  paginatedEvents: EventInstanceInfo[] = [];
  performanceDatesTickets: EventInstanceInfo[] = [];
  daysWithEvents = new Set<number>();
  private destroy$ = new Subject<void>();
  isLoading: boolean = true;
  currentLoadedMonth: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private eventService: EventService,
    private performancesService: PerformancesService,
    private genreService: GenreService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.ensureAllowedMonth();
    this.rebuildMonth();
    this.eventService.getMinMaxDates()
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        //this.minDate = new Date(res.minDate);
        this.maxDate = new Date(res.maxDate);
        this.selectedDate = new Date(res.minDate);
        this.cdr.detectChanges();
        this.currentLoadedMonth = '';

        this.loadMonthData(this.selectedDate);
      });
  }

  ngAfterViewInit(): void {
    this.updateCardPosition();
  }
  private updateCardPosition(): void {
    // подождём рендер (важно после смены месяца/дня)
    requestAnimationFrame(() => {
      const wrap = this.daysWrap?.nativeElement;
      if (!wrap) return;

      const active = this.dayEls?.toArray()
        .find(x => Number(x.nativeElement.dataset['day']) === this.activeDay)?.nativeElement;

      if (!active) return;

      const wrapRect = wrap.getBoundingClientRect();
      const aRect = active.getBoundingClientRect();

      let x = (aRect.left - wrapRect.left) + aRect.width / 2;

      // чтобы карточка не вылезала за края (340px ≈ 170 half)
      const half = 170;
      x = Math.max(half, Math.min(wrapRect.width - half, x));

      this.cardX = x;
    });
  }

  onDayClick(day: number): void {
    if (!this.daysWithEvents.has(day)) return;
    this.selectDay(day);
    this.updateCardPosition();
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
  private rebuildSelectedEvents(): void {
    const y = this.currentMonth.getFullYear();
    const m = this.currentMonth.getMonth();

    this.selectedEvents = this.performanceDatesTickets
      .filter(ev => {
        const d = new Date(ev.dateTime);
        return d.getFullYear() === y && d.getMonth() === m && d.getDate() === this.activeDay;
      })
      .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());
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
    this.updateCardPosition();
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
            this.rebuildMonth();
            this.rebuildDaysWithEvents();
            this.cdr.detectChanges();
          });
      });
    this.rebuildMonth();
    this.rebuildDaysWithEvents();
  }

  private updatePaginatedEvents(): void {
    if (!this.paginator) return;
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    this.paginatedEvents = this.eventsByDate.slice(startIndex, endIndex);
    this.cdr.detectChanges();
    this.updateCardPosition();
  }


  private rebuildDaysWithEvents() {
    const y = this.currentMonth.getFullYear();
    const m = this.currentMonth.getMonth();

    this.daysWithEvents.clear();

    for (const ev of this.performanceDatesTickets) {
      const d = new Date(ev.dateTime);

      if (d.getFullYear() === y && d.getMonth() === m) {
        this.daysWithEvents.add(d.getDate()); // 1..31
      }
    }
  }

  getGenreName(genre: number | undefined): string {
    if (genre === undefined) return '';
    const found = this.genres.find(g => g.id === genre);
    return found?.name ?? '';
  }

  private rebuildMonth(): void {
    const y = this.currentMonth.getFullYear();
    const m = this.currentMonth.getMonth();
    const daysInMonth = new Date(y, m + 1, 0).getDate();

    this.days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    this.monthLabel = this.monthNamesPL[m];

    if (this.activeDay > daysInMonth) this.activeDay = daysInMonth;
  }

  private ensureAllowedMonth(direction: 1 | -1 = 1): void {
    while (this.noPerformMonths.has(this.currentMonth.getMonth())) {
      this.currentMonth = new Date(
        this.currentMonth.getFullYear(),
        this.currentMonth.getMonth() + direction,
        1
      );
    }
  }

  nextMonth(): void {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 1);
    this.ensureAllowedMonth(1);
    this.loadMonthData(this.currentMonth);
  }

  prevMonth(): void {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1, 1);
    this.ensureAllowedMonth(-1);
    this.loadMonthData(this.currentMonth);

  }

  selectDay(day: number): void {
    this.activeDay = day;
    // позже тут можно будет триггерить загрузку спектаклей на выбранную дату
    this.rebuildSelectedEvents();

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
