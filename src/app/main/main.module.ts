import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import {MatIcon} from "@angular/material/icon";
import {CalendarModule} from "../calendar/calendar.module";


@NgModule({
  declarations: [
    MainComponent
  ],
  exports: [
    MainComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatIcon,
    CalendarModule
  ]
})
export class MainModule { }
