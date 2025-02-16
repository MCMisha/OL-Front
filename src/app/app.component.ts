import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'opera-front';
  showMenu: boolean = true;
  isLoading: boolean = true;
  private subscription = new Subscription();

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showMenu = !event.url.startsWith('/admin');
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
