import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NewsStripItem} from "../../models/news-strip-item";
import {NewsService} from "../../services/news.service";
import {Subscription} from "rxjs";
import {HelperFunctionsUtil} from "../../shared/utils/helper-functions.util";

@Component({
  selector: 'app-recent-news',
  templateUrl: './recent-news.component.html',
  styleUrl: './recent-news.component.scss'
})
export class RecentNewsComponent implements OnInit, OnDestroy {
  @ViewChild('viewport', { static: true }) viewportRef!: ElementRef<HTMLDivElement>;
  private isDragging = false;
  private startX = 0;
  private startScrollLeft = 0;

  headerTitle = '_AKTUALNOŚCI';
  moreLink = '/news';

  items: NewsStripItem[] = [];
  subscription = new Subscription();
  constructor(private newsService: NewsService,
              protected helperFunctions: HelperFunctionsUtil) {
  }

  ngOnInit() {
    this.subscription.add(
      this.newsService.getFiveRecent().subscribe(res => this.items = res)
    )
  }

  truncate(text: string, limit = 140) {
    return text.length > limit ? text.slice(0, limit) + '...' : text;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  formatDatePl(d: Date): string {
    const date = new Date(d);
    return date.toLocaleDateString('pl-PL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
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

    event.preventDefault();

    const el = this.viewportRef.nativeElement;
    const dx = event.clientX - this.startX;

    el.scrollLeft = this.startScrollLeft - dx * 1.7;
  }

  onPointerUp(event: PointerEvent): void {
    if (!this.isDragging) return;

    const el = this.viewportRef.nativeElement;

    this.isDragging = false;
    el.classList.remove('dragging');

    if (el.hasPointerCapture(event.pointerId)) {
      el.releasePointerCapture(event.pointerId);
    }
  }
}
