import {Component, OnDestroy, OnInit} from '@angular/core';
import {filter, Subscription, tap} from "rxjs";
import {AboutService} from "../../services/about.service";
import {AboutSectionDetails} from "../../models/about-section-details";
import {ActivatedRoute} from "@angular/router";
import {map, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-about-details',
  templateUrl: './about-details.component.html',
  styleUrl: './about-details.component.scss'
})
export class AboutDetailsComponent implements OnInit, OnDestroy {
  section!: AboutSectionDetails;
  slug!: string;
  subscription = new Subscription();
  protected isLoading: boolean = true;

  constructor(private aboutService: AboutService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription.add(
      this.route.paramMap.pipe(
        map(params => params.get('slug')),
        filter(slug => !!slug),
        tap(() => this.isLoading = true),
        switchMap(slug => this.aboutService.getBySlug(slug!))
      )
        .subscribe(section => {
          this.section = section;
          this.isLoading = false;
        })
    );
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
