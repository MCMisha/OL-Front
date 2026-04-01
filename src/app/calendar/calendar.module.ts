import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CalendarComponent} from './calendar.component';
import {MatCalendar} from "@angular/material/datepicker";
import {MatPaginator} from "@angular/material/paginator";
import {CalendarRoutingModule} from "./calendar-routing.module";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatIcon} from "@angular/material/icon";

@NgModule({
  declarations: [
    CalendarComponent
  ],
  exports: [
    CalendarComponent
  ],
  imports: [
    CommonModule,
    MatCalendar,
    MatPaginator,
    CalendarRoutingModule,
    MatProgressBar,
    MatIcon
  ]
})
export class CalendarModule {
}
