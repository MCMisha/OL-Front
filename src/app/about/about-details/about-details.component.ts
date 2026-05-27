import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AboutService} from "../../services/about.service";
import {SectionDetails} from "../../models/section-details";
import {ActivatedRoute, Router} from "@angular/router";
import {Artist} from "../../models/artist";
import {SectionList} from "../../models/section-list";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-about-details',
  templateUrl: './about-details.component.html',
  styleUrl: './about-details.component.scss'
})
export class AboutDetailsComponent implements OnInit, OnDestroy {
  section!: SectionDetails;
  slug!: string;
  protected isLoading: boolean = true;

  artists: Artist[] = [];

  aboutSections: SectionList[] = [];

  selectedSection?: SectionList = undefined;

  private subscription = new Subscription();

  constructor(
    private aboutSectionService: AboutService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.subscription.add(
      this.aboutSectionService.getAboutSectionList().subscribe(res => {
        this.aboutSections = [{ id: 99, title: 'artyści', slug: 'artists', isVisible: true, order: 0 }, ...res];
      })
    )
    this.subscription.add(
      this.route.paramMap.pipe(
        switchMap(params => {
          this.isLoading = true;

          const slug = params.get('slug') ?? '';

          this.selectedSection = this.aboutSections.find(s => s.slug === slug);

          return this.aboutSectionService.getBySlug(slug);
        })
      ).subscribe(section => {
        this.section = section;
        this.isLoading = false;
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  selectSection(aboutSection: SectionList): void {
    this.selectedSection = aboutSection;
    this.router.navigate(['/about', aboutSection.slug]);
  }
}
