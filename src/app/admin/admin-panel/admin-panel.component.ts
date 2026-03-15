import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from "@angular/material/sidenav";
import { BreakpointObserver } from "@angular/cdk/layout";
import { Subscription } from "rxjs";
import { NavigationEnd, Router } from "@angular/router";
import {OverlayContainer} from "@angular/cdk/overlay";

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
    { icon: 'theater_comedy', title: 'Gatunki', link: `${this.basePath}/genre` },
    { icon: 'pin_drop', title: 'Miejsca', link: `${this.basePath}/place` },
    { icon: 'event', title: 'Spektakle', link: `${this.basePath}/performance` },
    { icon: 'newspaper', title: 'Aktualności', link: `${this.basePath}/news` },
    { icon: 'info', title: 'O nas', link: `${this.basePath}/about-us` },
    { icon: 'contact_page', title: 'Kontakt', link: `${this.basePath}/contact` },
    { icon: 'person_outline', title: 'Artyści', link: `${this.basePath}/artists` },
    { icon: 'forum', title: 'Publiczne komentarze', link: `${this.basePath}/comment` }
  ];

  protected currentTitle = '';

  private subscription = new Subscription();
  protected isCollapsed = true;

  constructor(
    private overlay: OverlayContainer,
    private observer: BreakpointObserver,
    private router: Router,
  ) {}

  ngOnInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      this.isMobile = screenSize.matches;
    });

    this.setCurrentTitle(this.router.url);
    document.body.classList.add('admin-theme');
    document.body.classList.remove('public-theme');

    const oc = this.overlay.getContainerElement();
    oc.classList.add('admin-theme');
    oc.classList.remove('public-theme');
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
    document.body.classList.remove('admin-theme');
    this.overlay.getContainerElement().classList.remove('admin-theme');

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
