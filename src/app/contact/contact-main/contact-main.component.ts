import {Component, OnDestroy, OnInit} from '@angular/core';
import {SectionList} from "../../models/section-list";
import {SectionDetails} from "../../models/section-details";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {ContactSectionService} from "../../services/contact-section.service";

@Component({
  selector: 'app-contact-main',
  templateUrl: './contact-main.component.html',
  styleUrl: './contact-main.component.scss'
})
export class ContactMainComponent implements OnInit, OnDestroy {
  isLoading = true;

  aboutSections: SectionList[] = [];
  mainSectionDetails!: SectionDetails;
  selectedSection?: SectionList = undefined;

  private subscription = new Subscription();


  constructor(
    private contactSectionService: ContactSectionService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.subscription.add(
      this.contactSectionService.getContactSectionList().subscribe(res => {
        this.aboutSections = res;
        this.isLoading = false;
      })
    )
    const slug = 'main';
    this.subscription.add(this.contactSectionService.getBySlug(slug).subscribe(res => {
      this.mainSectionDetails = res;
    }))
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  selectSection(contactSection: SectionList): void {
    this.selectedSection = contactSection;
    this.router.navigate(['/contact', contactSection.slug]);
  }
}
