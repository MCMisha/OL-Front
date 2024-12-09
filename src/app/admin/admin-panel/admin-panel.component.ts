import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from "@angular/material/sidenav";
import { BreakpointObserver } from "@angular/cdk/layout";
import { Subscription } from "rxjs";
import { NavigationEnd, Router } from "@angular/router";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit, OnDestroy {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile = false;

  private basePath = '/admin/panel';
  protected menuItems = [
    { icon: 'home', title: 'Strona głowna', link: `${this.basePath}/main` },
    { icon: 'theater_comedy', title: 'Gatunki', link: `${this.basePath}/genre` }
  ];

  protected currentTitle = '';

  private subscription = new Subscription();
  protected isCollapsed = true;

  constructor(
    private observer: BreakpointObserver,
    private router: Router,
  ) {}

  ngOnInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      this.isMobile = screenSize.matches;
    });

    this.setCurrentTitle(this.router.url);

    this.subscription.add(
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          const currentRoute = this.router.url;
          const menuItem = this.menuItems.find(item => currentRoute.startsWith(item.link));
          this.currentTitle = menuItem ? menuItem.title : '';
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toggleMenu() {
    if (this.isMobile) {
      this.sidenav.toggle();
      this.isCollapsed = false;
    } else {
      this.sidenav.open();
      this.isCollapsed = !this.isCollapsed;
    }
  }

  private setCurrentTitle(url: string) {
    const menuItem = this.menuItems.find(item => url.startsWith(item.link));
    this.currentTitle = menuItem ? menuItem.title : '';
  }
}
