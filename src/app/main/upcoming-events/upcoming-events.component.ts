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
  @ViewChild('viewport', { static: true }) viewportRef!: ElementRef<HTMLDivElement>;

  events: UpcomingEventVm[] = [];
  subscription = new Subscription();

  private isDragging = false;
  private startX = 0;
  private startScrollLeft = 0;

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
    const el = this.viewportRef.nativeElement;
    const delta = 260 + 24;

    el.scrollBy({
      left: dir === 'next' ? delta : -delta,
      behavior: 'smooth'
    });
  }

  onPointerDown(event: PointerEvent): void {
    const el = this.viewportRef.nativeElement;

    this.isDragging = true;
    this.startX = event.clientX;
    this.startScrollLeft = el.scrollLeft;

    el.setPointerCapture(event.pointerId);
    el.classList.add('dragging');
  }

  onPointerMove(event: PointerEvent): void {
    if (!this.isDragging) return;

    const el = this.viewportRef.nativeElement;
    const dx = event.clientX - this.startX;
    const speed = 2.2;

    el.scrollLeft = this.startScrollLeft - dx * speed;
  }

  onPointerUp(): void {
    if (!this.isDragging) return;

    const el = this.viewportRef.nativeElement;
    this.isDragging = false;
    el.classList.remove('dragging');
  }
}
