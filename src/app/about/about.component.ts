import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {AboutSectionService} from "../services/about-section.service";
import {filter, Subscription} from "rxjs";
import {SectionDetails} from "../models/section-details";
import {SectionList} from "../models/section-list";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit, OnDestroy {
  @ViewChild('titlesViewport') titlesViewport!: ElementRef<HTMLElement>;

  private isDragging = false;
  private hasMoved = false;
  private startX = 0;
  private startScrollLeft = 0;
  menuOpen = false;
  isLoading = true;
  menu: SectionList[] = [];
  sections: SectionList[] = [];
  currentSection?: SectionDetails;
  selectedMenuItem?: SectionList | undefined;
  subscription = new Subscription();

  constructor(
    private aboutService: AboutSectionService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loadSections();

    this.subscription.add(
      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(() => {
          this.syncSelectedMenuItem();
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadSections(): void {
    this.isLoading = true;

    this.subscription.add(
      this.aboutService.getAboutSectionList().subscribe(res => {
        this.sections = res;

        this.menu = [
          {
            id: 999999,
            title: 'Zespół',
            slug: 'artists',
            order: 1,
            isVisible: true
          },
          {
            id: 999998,
            title: 'Spektakle',
            slug: 'performances',
            order: 2,
            isVisible: true
          },
          ...this.sections,
        ];

        this.menu.sort((a, b) => a.order - b.order);

        this.syncSelectedMenuItem();

        this.isLoading = false;
      })
    );
  }

  private syncSelectedMenuItem(): void {
    const slug = this.getCurrentSlug();

    if (!slug) {
      this.selectedMenuItem = undefined;
      return;
    }

    this.selectedMenuItem = this.menu.find(item => item.slug === slug);
  }

  private getCurrentSlug(): string | null {
    const childSlug = this.route.firstChild?.snapshot.paramMap.get('slug');

    if (childSlug) {
      return childSlug;
    }

    const tree = this.router.parseUrl(this.router.url);
    const primary = tree.root.children['primary'];

    const segments = primary?.segments.map(segment => segment.path) ?? [];
    const aboutIndex = segments.indexOf('about');

    if (aboutIndex === -1) {
      return null;
    }

    return segments[aboutIndex + 1] ?? null;
  }

  onPointerDown(event: PointerEvent): void {
    if (event.button !== 0) {
      return;
    }

    const el = this.titlesViewport.nativeElement;

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

    const el = this.titlesViewport.nativeElement;
    const dx = event.clientX - this.startX;

    if (Math.abs(dx) > 5) {
      this.hasMoved = true;
      event.preventDefault();
    }

    el.scrollLeft = this.startScrollLeft - dx * 1.4;
  }

  onPointerUp(): void {
    if (!this.isDragging) {
      return;
    }

    this.isDragging = false;
    this.titlesViewport.nativeElement.classList.remove('dragging');
  }

  onTitleClick(event: MouseEvent): void {
    if (this.hasMoved) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
}
