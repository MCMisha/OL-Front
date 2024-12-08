import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import localePl from '@angular/common/locales/pl';
import { PerformancesComponent } from './performances.component';
import {MatCalendar} from "@angular/material/datepicker";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDateFormats} from "@angular/material/core";
import {CustomDateAdapter} from "../adapters/custom-date-adapter";
import {MatPaginator} from "@angular/material/paginator";
import {PerformancesRoutingModule} from "./performances-routing.module";
import {MatProgressBar} from "@angular/material/progress-bar";


registerLocaleData(localePl);

export const CUSTOM_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    PerformancesComponent
  ],
  exports: [
    PerformancesComponent
  ],
  imports: [
    CommonModule,
    MatCalendar,
    MatPaginator,
    PerformancesRoutingModule,
    MatProgressBar
  ],
  providers:[
    { provide: LOCALE_ID, useValue: 'pl' },
    { provide: MAT_DATE_LOCALE, useValue: 'pl-PL' },
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }
  ]
})
export class PerformancesModule { }
