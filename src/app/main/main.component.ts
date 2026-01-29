import {Component} from '@angular/core';
import {HeroSlide} from "../models/hero-slide";
import {Subscription} from "rxjs";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  days = Array.from({ length: 31 }, (_, i) => i + 1);
  activeDay = 13;
  showMenu: boolean = true;
  isLoading: boolean = true;
  mobileMenuOpen = false;
  private subscription = new Subscription();
  slides: HeroSlide[] = [
    {
      id: 1,
      subtitle: 'Operetka',
      title: 'ZEMSTA NIETOPERZA',
      dateRange: '10.12 — 11.12',
      backgroundUrl: 'assets/hero/zemsta.jpg',
      buyUrl: 'https://...',
      detailsLink: ['/performances', 1]
    },
    {
      id: 2,
      subtitle: 'Musical',
      title: 'PHANTOM',
      dateRange: '12.01 — 13.01',
      backgroundUrl: 'assets/hero/phantom.jpg',
      buyUrl: 'https://...',
      detailsLink: ['/performances', 2]
    }
  ];

  active = 0;
  isAnimating = false;

  private timerId: any = null;
  autoplayMs = 5000; // если не надо — отключишь
  constructor(private router: Router) {
  }
  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }

  navigateFromMenu() {
    // закрыть меню после перехода
    this.closeMobileMenu();
  }

  ngOnInit(): void {
    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showMenu = !event.url.startsWith('/admin');
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get activeSlide(): HeroSlide {
    return this.slides[this.active];
  }

  get dots(): number[] {
    return Array.from({ length: this.slides.length }, (_, i) => i);
  }

  goTo(index: number): void {
    if (index === this.active || this.isAnimating) return;

    this.isAnimating = true;

    // маленькая пауза для fade-out
    setTimeout(() => {
      this.active = index;
      this.isAnimating = false;
    }, 220);

    // сбрасываем таймер при ручном клике
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
    // если автоплей не нужен — просто убери вызовы
    this.startAutoplay();
  }

  trackByIndex(i: number): number {
    return i;
  }
}
