import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SectionList} from "../models/section-list";
import {filter, Subscription} from "rxjs";
import {ContactSectionService} from "../services/contact-section.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit, OnDestroy {
  @ViewChild('titlesViewport') titlesViewport!: ElementRef<HTMLElement>;

  private isDragging = false;
  private hasMoved = false;
  private startX = 0;
  private startScrollLeft = 0;
  isLoading = true;
  menu: SectionList[] = [];
  sections: SectionList[] = [];
  selectedMenuItem?: SectionList | undefined;
  subscription = new Subscription();

  constructor(private contactService: ContactSectionService,
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
      this.contactService.getContactSectionList().subscribe(res => {
        this.menu = res;
        this.menu.sort((a, b) => a.order - b.order);

        this.syncSelectedMenuItem();
        this.isLoading = false;
      })
    )
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
