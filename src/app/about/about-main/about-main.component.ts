import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AboutService} from "../../services/about.service";
import {SectionList} from "../../models/section-list";
import {Router} from "@angular/router";
import {SectionDetails} from "../../models/section-details";

@Component({
  selector: 'app-about-main',
  templateUrl: './about-main.component.html',
  styleUrl: './about-main.component.scss'
})
export class AboutMainComponent implements OnInit, OnDestroy {
  isLoading = true;

  aboutSections: SectionList[] = [];
  mainSectionDetails!: SectionDetails;
  selectedSection?: SectionList = undefined;

  private subscription = new Subscription();


  constructor(
    private aboutSectionService: AboutService,
    private router: Router  ) {
  }
  isMobileNavOpen = false;

  openMobileNav(): void {
    this.isMobileNavOpen = true;
  }

  closeMobileNav(): void {
    this.isMobileNavOpen = false;
  }
  ngOnInit(): void {
    this.isLoading = true;
    this.subscription.add(
      this.aboutSectionService.getAboutSectionList().subscribe(res => {
        this.aboutSections = [{id: 99, title: 'artyści', slug: 'artists', isVisible: true, order: 0}, ...res];
        this.isLoading = false;
      })
    )
    const slug = 'main';
    this.subscription.add(this.aboutSectionService.getBySlug(slug).subscribe(res => {
      this.mainSectionDetails = res;
    }))
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  selectSection(aboutSection: SectionList): void {
    this.selectedSection = aboutSection;
    this.router.navigate(['/about', aboutSection.slug]);
  }
}
