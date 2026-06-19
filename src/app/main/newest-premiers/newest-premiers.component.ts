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
  private suppressClick = false;
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
    const viewport = this.viewport.nativeElement;

    this.isDragging = true;
    this.suppressClick = false;
    this.startX = event.clientX;
    this.startScrollLeft = viewport.scrollLeft;

    viewport.classList.add('dragging');
    viewport.setPointerCapture(event.pointerId);
  }

  onPointerMove(event: PointerEvent): void {
    if (!this.isDragging) {
      return;
    }

    const viewport = this.viewport.nativeElement;
    const diff = event.clientX - this.startX;

    if (Math.abs(diff) > 5) {
      this.suppressClick = true;
    }

    viewport.scrollLeft = this.startScrollLeft - diff;
  }

  onPointerUp(event: PointerEvent): void {
    if (!this.isDragging) {
      return;
    }

    const viewport = this.viewport.nativeElement;

    this.isDragging = false;
    viewport.classList.remove('dragging');

    if (viewport.hasPointerCapture(event.pointerId)) {
      viewport.releasePointerCapture(event.pointerId);
    }

    setTimeout(() => {
      this.suppressClick = false;
    }, 0);
  }

  onLinkClick(event: MouseEvent): void {
    if (!this.suppressClick) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
