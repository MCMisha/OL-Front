import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminPanelSliderRoutingModule} from "./admin-panel-slider-routing.module";
import { AdminPanelSliderFormComponent } from './admin-panel-slider-form/admin-panel-slider-form.component';
import {MatError, MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatIcon} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatButton} from "@angular/material/button";


@NgModule({
  declarations: [
    AdminPanelSliderFormComponent
  ],
  imports: [
    CommonModule,
    AdminPanelSliderRoutingModule,
    MatFormField,
    MatLabel,
    ReactiveFormsModule,
    MatError,
    MatDatepickerToggle,
    MatDatepickerInput,
    MatDatepicker,
    MatSlideToggle,
    MatIcon,
    MatProgressSpinner,
    MatInput,
    MatButton
  ]
})
export class AdminPanelSliderModule { }
