import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerformancesRoutingModule } from './performances-routing.module';
import { PerformancesComponent } from './performances.component';
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatPaginator} from "@angular/material/paginator";
import { PerformancesDetailsComponent } from './performances-details/performances-details.component';
import {MatButton} from "@angular/material/button";


@NgModule({
  declarations: [
    PerformancesComponent,
    PerformancesDetailsComponent
  ],
  imports: [
    CommonModule,
    PerformancesRoutingModule,
    MatProgressBar,
    MatPaginator,
    MatButton
  ]
})
export class PerformancesModule { }
