import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {AboutSectionService} from "../../services/about-section.service";
import {SectionDetails} from "../../models/section-details";
import {ActivatedRoute, Router} from "@angular/router";
import {Artist} from "../../models/artist";
import {switchMap} from "rxjs/operators";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {SidebarItem} from "../../models/sidebar-item";

@Component({
  selector: 'app-about-details',
  templateUrl: './about-details.component.html',
  styleUrl: './about-details.component.scss'
})
export class AboutDetailsComponent implements OnInit, OnDestroy {
  @ViewChild('contentRef') contentRef!: ElementRef<HTMLElement>;

  section!: SectionDetails;
  slug!: string;
  protected isLoading: boolean = true;
  protected safeContent?: SafeHtml;
  artists: Artist[] = [];

  activeSidebarIndex = 0;

  private observer?: IntersectionObserver;

  sidebarItems: SidebarItem[] = [];

  private subscription = new Subscription();

  constructor(
    private aboutSectionService: AboutSectionService,
    private sanitazer: DomSanitizer,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.subscription.add(
      this.route.paramMap.pipe(
        switchMap(params => {
          this.isLoading = true;

          const slug = params.get('slug') ?? '';

          return this.aboutSectionService.getBySlug(slug);
        })
      ).subscribe(section => {
        this.section = section;
        this.safeContent = this.sanitazer.bypassSecurityTrustHtml(this.section.contentHtml);
        this.buildSidebarItems(this.section.contentHtml ?? '');
        this.isLoading = false;
        setTimeout(() => {
          this.initSidebarObserver();
        });
      })
    )
  }

  private buildSidebarItems(html: string): void {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const titles = Array.from(doc.querySelectorAll('[data-sidebar-title]'));

    this.sidebarItems = titles
      .map((el, index) => ({
        label: el.textContent?.trim() ?? '',
        index
      }))
      .filter(item => item.label);
  }

  scrollToSidebarItem(index: number): void {
    const target = this.getSidebarTargetByIndex(index);

    if (!target) {
      return;
    }

    const offset = 130;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top,
      behavior: 'smooth'
    });

    this.activeSidebarIndex = index;
  }

  private getSidebarTargetByIndex(index: number): HTMLElement | null {
    if (!this.contentRef?.nativeElement) {
      return null;
    }

    const markers = Array.from(
      this.contentRef.nativeElement.querySelectorAll('[data-sidebar-title]')
    ) as HTMLElement[];

    const marker = markers[index];

    if (!marker) {
      return null;
    }

    return marker.closest('h1, h2, h3, h4, h5, h6') as HTMLElement ?? marker;
  }

  private initSidebarObserver(): void {
    this.observer?.disconnect();

    const targets = this.sidebarItems
      .map(item => this.getSidebarTargetByIndex(item.index))
      .filter((el): el is HTMLElement => !!el);

    if (!targets.length) {
      return;
    }

    this.observer = new IntersectionObserver(
      entries => {
        const visibleEntries = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => {
            return a.boundingClientRect.top - b.boundingClientRect.top;
          });

        const firstVisible = visibleEntries[0];

        if (!firstVisible) {
          return;
        }

        const index = targets.indexOf(firstVisible.target as HTMLElement);

        if (index !== -1) {
          this.activeSidebarIndex = this.sidebarItems[index].index;
        }
      },
      {
        root: null,
        rootMargin: '-140px 0px -65% 0px',
        threshold: 0
      }
    );

    targets.forEach(target => this.observer?.observe(target));
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.subscription.unsubscribe();
  }
}
