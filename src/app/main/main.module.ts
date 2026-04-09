import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import {MatIcon} from "@angular/material/icon";
import {CalendarModule} from "../calendar/calendar.module";
import { UpcomingEventsComponent } from './upcoming-events/upcoming-events.component';
import { RecentNewsComponent } from './recent-news/recent-news.component';
import { NewestPremiersComponent } from './newest-premiers/newest-premiers.component';
import { PublicCommentsComponent } from './public-comments/public-comments.component';
import { ArtistsComponent } from './artists/artists.component';
import { MainFooterComponent } from './main-footer/main-footer.component';


@NgModule({
  declarations: [
    MainComponent,
    UpcomingEventsComponent,
    RecentNewsComponent,
    NewestPremiersComponent,
    PublicCommentsComponent,
    ArtistsComponent,
    MainFooterComponent
  ],
    exports: [
        MainComponent,
        MainFooterComponent
    ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatIcon,
    CalendarModule
  ]
})
export class MainModule { }
