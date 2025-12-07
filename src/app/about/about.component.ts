import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AboutService} from "../services/about.service";
import {filter, Subscription, tap} from "rxjs";
import {map, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit, OnDestroy {
  menuOpen = false;
  isLoading = true;
  menu: any[] = [];
  sections: any[] = [];
  currentSection: any = null;
  subscription = new Subscription();

  constructor(
    private aboutService: AboutService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loadSections();
    this.subscription.add(
      this.route.paramMap.pipe(
        map(params => params.get('slug')),
        filter(slug => !!slug),
        tap(() => this.isLoading = true),
        switchMap(slug => this.aboutService.getBySlug(slug!))
      )
        .subscribe(section => {
          this.currentSection = section;
          this.isLoading = false;
        })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadSections() {
    this.aboutService.getAboutSectionList().subscribe(res => {
      this.sections = res;

      this.menu = [
        {
          id: 999999,
          title: 'Artyści',
          slug: 'artists',
          isStatic: true
        },
        ...this.sections,
      ];

      const currentSlug = this.route.snapshot.paramMap.get('slug') ?? 'artists';
      this.router.navigate(['./', currentSlug], {
        relativeTo: this.route
      });
    });
  }

  loadSection(slug: string) {
    this.aboutService.getBySlug(slug).subscribe(res => {
      this.currentSection = res;
    });
  }

  select(slug: string) {
    this.router.navigate(['/about', slug]);
  }

}
