import {Component, OnDestroy, OnInit} from '@angular/core';
import {SectionDetails} from "../../models/section-details";
import {Artist} from "../../models/artist";
import {SectionList} from "../../models/section-list";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {ContactSectionService} from "../../services/contact-section.service";

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss'
})
export class ContactDetailsComponent implements OnInit, OnDestroy {
  section!: SectionDetails;
  slug!: string;
  protected isLoading: boolean = true;

  artists: Artist[] = [];

  aboutSections: SectionList[] = [];

  selectedSection?: SectionList = undefined;

  private subscription = new Subscription();

  constructor(
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

          const slug = params.get('slug') ?? '';

          this.selectedSection = this.aboutSections.find(s => s.slug === slug);

          return this.contactSectionService.getBySlug(slug);
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
    this.router.navigate(['/contact', aboutSection.slug]);
  }
}

