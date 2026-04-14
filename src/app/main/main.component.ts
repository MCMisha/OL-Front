import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeroSlide } from '../models/hero-slide';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { MainPageBackgroundService } from '../services/main-page-background.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit, OnDestroy {
  days = Array.from({ length: 31 }, (_, i) => i + 1);
  activeDay = 13;
  showMenu = true;
  isLoading = true;
  mobileMenuOpen = false;

  private subscription = new Subscription();

  slides: HeroSlide[] = [];
  active = 0;
  isAnimating = false;

  private timerId: any = null;
  autoplayMs = 5000;

  constructor(
    private mainPageBackgroundService: MainPageBackgroundService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.showMenu = !event.url.startsWith('/admin');
          this.isLoading = false;
        }
      })
    );

    this.subscription.add(
      this.mainPageBackgroundService.getAllActive().subscribe({
        next: (backgrounds) => {
          this.slides = backgrounds.map(bg => ({
            id: bg.id,
            subtitle: bg.title,
            title: bg.title,
            dateRange: '',
            backgroundUrl: this.toImageUrl(bg.mainImage),
            buyUrl: '',
            detailsLink: null
          }));

          this.active = 0;

          if (this.slides.length > 1) {
            this.startAutoplay();
          }
        },
        error: (err) => {
          console.error('Ошибка загрузки фонов главной страницы', err);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
    this.subscription.unsubscribe();
  }

  get activeSlide(): HeroSlide | null {
    return this.slides.length ? this.slides[this.active] : null;
  }

  get dots(): number[] {
    return Array.from({ length: this.slides.length }, (_, i) => i);
  }

  toImageUrl(base64: string | null | undefined): string {
    if (!base64) {
      return '';
    }

    if (base64.startsWith('data:image')) {
      return base64;
    }

    return `data:image/jpeg;base64,${base64}`;
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }

  navigateFromMenu() {
    this.closeMobileMenu();
  }

  goTo(index: number): void {
    if (index === this.active || this.isAnimating) return;

    this.isAnimating = true;

    setTimeout(() => {
      this.active = index;
      this.isAnimating = false;
    }, 220);

    this.restartAutoplay();
  }

  next(): void {
    const i = (this.active + 1) % this.slides.length;
    this.goTo(i);
  }

  prev(): void {
    const i = (this.active - 1 + this.slides.length) % this.slides.length;
    this.goTo(i);
  }

  startAutoplay(): void {
    if (this.slides.length <= 1) return;

    this.stopAutoplay();
    this.timerId = setInterval(() => this.next(), this.autoplayMs);
  }

  stopAutoplay(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  restartAutoplay(): void {
    this.startAutoplay();
  }

  trackByIndex(i: number): number {
    return i;
  }
}
