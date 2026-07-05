import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SectionDetails} from "../../models/section-details";
import {Artist} from "../../models/artist";
import {SectionList} from "../../models/section-list";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {ContactSectionService} from "../../services/contact-section.service";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {SidebarItem} from "../../models/sidebar-item";

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss'
})
export class ContactDetailsComponent implements OnInit, OnDestroy {
  @ViewChild('contentRef') contentRef!: ElementRef<HTMLElement>;

  section!: SectionDetails;
  slug!: string;
  protected isLoading: boolean = true;

  artists: Artist[] = [];

  aboutSections: SectionList[] = [];

  selectedSection?: SectionList = undefined;
  protected safeContent?: SafeHtml;
  activeSidebarIndex = 0;

  private observer?: IntersectionObserver;

  sidebarItems: SidebarItem[] = [];
  private subscription = new Subscription();

  constructor(
    private sanitizer: DomSanitizer,
    private contactSectionService: ContactSectionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.subscription.add(
      this.contactSectionService.getContactSectionList().subscribe(res => {
        this.aboutSections = res;
      })
    )
    this.subscription.add(
      this.route.paramMap.pipe(
        switchMap(params => {
          this.isLoading = true;

          const slug = params.get('slug') ?? 'main';

          this.selectedSection = this.aboutSections.find(s => s.slug === slug);

          return this.contactSectionService.getBySlug(slug);
        })
      ).subscribe(section => {
        this.section = section;
        this.safeContent = this.sanitizer.bypassSecurityTrustHtml(this.section.contentHtml);
        this.buildSidebarItems(this.section.contentHtml ?? '');
        this.isLoading = false;
        setTimeout(() => {
          this.initSidebarObserver();
        });
      })
    )
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.subscription.unsubscribe();
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
  selectSection(aboutSection: SectionList): void {
    this.selectedSection = aboutSection;
    this.router.navigate(['/contact', aboutSection.slug]);
  }
}

