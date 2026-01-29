import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {UpcomingEventVm} from "../../models/upcoming-event-vm";
import {PerformanceEventService} from "../../services/performance-event.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.scss']
})
export class UpcomingEventsComponent implements OnInit, OnDestroy{
  @ViewChild('track', { static: true }) trackRef!: ElementRef<HTMLDivElement>;

  events: UpcomingEventVm[] = [];
  subscription = new Subscription();

  constructor(private performanceEventService: PerformanceEventService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.performanceEventService.getNearestSixEvents().pipe(
        map((dtos: UpcomingEventVm[] | null | undefined) => (dtos ?? []).map(dto => ({
          eventId: dto.eventId,
          performanceId: dto.performanceId,
          startAt: new Date(dto.startAt),
          title: dto.title,
          genre: dto.genre,
          place: dto.place,
          imageUrl: dto.imageUrl
        } as UpcomingEventVm)))
      ).subscribe(events => this.events = events)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  scroll(dir: 'prev' | 'next'): void {
    const el = this.trackRef.nativeElement;
    const cardWidth = 260;
    const gap = 24;
    const delta = cardWidth + gap;

    el.scrollBy({ left: dir === 'next' ? delta : -delta, behavior: 'smooth' });
  }
}
