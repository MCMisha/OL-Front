import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerformancesRoutingModule } from './performances-routing.module';
import { PerformancesComponent } from './performances.component';
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatPaginator} from "@angular/material/paginator";


@NgModule({
  declarations: [
    PerformancesComponent
  ],
  imports: [
    CommonModule,
    PerformancesRoutingModule,
    MatProgressBar,
    MatPaginator
  ]
})
export class PerformancesModule { }
