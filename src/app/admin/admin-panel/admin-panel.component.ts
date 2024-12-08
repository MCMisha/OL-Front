import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MatToolbar} from "@angular/material/toolbar";
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent implements OnInit, OnDestroy {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile= false;

  private basePath = '/admin/panel';
  protected menuItems = [
    {icon: 'home', title: 'Strona głowna', link: `${this.basePath}/main`}
  ];

  private subscription = new Subscription();
  protected isCollapsed = true;
  constructor(private observer: BreakpointObserver) {}

  ngOnInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if(screenSize.matches){
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }

  ngOnDestroy() {
   this.subscription.unsubscribe();
  }

  toggleMenu() {
    if(this.isMobile){
      this.sidenav.toggle();
      this.isCollapsed = false;
    } else {
      this.sidenav.open();
      this.isCollapsed = !this.isCollapsed;
    }
  }
}
