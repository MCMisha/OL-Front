import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerformancesRoutingModule } from './performances-routing.module';
import { PerformancesComponent } from './performances.component';


@NgModule({
  declarations: [
    PerformancesComponent
  ],
  imports: [
    CommonModule,
    PerformancesRoutingModule
  ]
})
export class PerformancesModule { }
