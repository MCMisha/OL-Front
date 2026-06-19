import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CommentVm} from "../../models/comment-vm";
import {CommentService} from "../../services/comment.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-public-comments',
  templateUrl: './public-comments.component.html',
  styleUrl: './public-comments.component.scss'
})
export class PublicCommentsComponent implements OnInit, OnDestroy {
  @ViewChild('viewport')
  viewport!: ElementRef<HTMLDivElement>;

  private isDragging = false;
  private startX = 0;
  private startScrollLeft = 0;
  private suppressClick = false;
  comments: CommentVm[] = [];
  subscription = new Subscription();

  constructor(private commentService: CommentService) {
  }

  ngOnInit(): void {
    this.subscription.add(
      this.commentService.getComments().subscribe(res => {
        this.comments = res;
      })
    )
  }

  stars(n: number) {
    return Array.from({length: 5}, (_, i) => i < n);
  }

  scroll(direction: 'prev' | 'next'): void {
    const viewport = this.viewport.nativeElement;
    const card = viewport.querySelector<HTMLElement>('.rCard');
    const gap = 32;

    const amount = card ? card.offsetWidth + gap : 560;

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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
