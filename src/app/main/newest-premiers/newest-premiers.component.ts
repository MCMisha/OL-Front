import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {mapPremiereToVm, PremiereVm} from "../../models/premiere-vm";
import {PerformancesService} from "../../services/performances.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-newest-premiers',
  templateUrl: './newest-premiers.component.html',
  styleUrl: './newest-premiers.component.scss'
})
export class NewestPremiersComponent implements OnInit, OnDestroy {
  @ViewChild('viewport')
  viewport!: ElementRef<HTMLDivElement>;

  private isDragging = false;
  private startX = 0;
  private startScrollLeft = 0;
  private hasMoved = false;
  protected items: PremiereVm[] = [];
  subscription = new Subscription();

  constructor(private premiereService: PerformancesService) {
  }

  ngOnInit(): void {
    this.subscription.add(
      this.premiereService.getNewestPremieres().subscribe(
        (data) => {
          this.items = data.map(mapPremiereToVm);
        },
        (err) => {
          console.error('Błąd podczas pobierania premier', err);
        }
      )
    )
  }

  scroll(direction: 'prev' | 'next'): void {
    const viewport = this.viewport.nativeElement;
    const card = viewport.querySelector<HTMLElement>('.pCard');
    const gap = 28;

    const amount = card ? card.offsetWidth + gap : 420;

    viewport.scrollBy({
      left: direction === 'next' ? amount : -amount,
      behavior: 'smooth'
    });
  }

  onPointerDown(event: PointerEvent): void {
    if (event.button !== 0) {
      return;
    }

    const el = this.viewport.nativeElement;

    this.isDragging = true;
    this.hasMoved = false;
    this.startX = event.clientX;
    this.startScrollLeft = el.scrollLeft;

    el.classList.add('dragging');
  }

  onPointerMove(event: PointerEvent): void {
    if (!this.isDragging) {
      return;
    }

    const el = this.viewport.nativeElement;
    const dx = event.clientX - this.startX;

    if (Math.abs(dx) > 5) {
      this.hasMoved = true;
      event.preventDefault();
    }

    el.scrollLeft = this.startScrollLeft - dx * 1.7;
  }

  onPointerUp(): void {
    if (!this.isDragging) {
      return;
    }

    const el = this.viewport.nativeElement;

    this.isDragging = false;
    el.classList.remove('dragging');
  }

  protected onCardClick($event: MouseEvent) {
    if (this.hasMoved) {
      $event.preventDefault();
      $event.stopPropagation();
    }
  }

  onLinkClick(event: MouseEvent): void {
    if (!this.hasMoved) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
