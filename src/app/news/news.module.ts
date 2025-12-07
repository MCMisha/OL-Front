import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';
import { NewsDetailsComponent } from './news-details/news-details.component';
import {MatProgressBar} from "@angular/material/progress-bar";


@NgModule({
  declarations: [
    NewsComponent,
    NewsDetailsComponent
  ],
    imports: [
        CommonModule,
        NewsRoutingModule,
        MatProgressBar
    ]
})
export class NewsModule { }
