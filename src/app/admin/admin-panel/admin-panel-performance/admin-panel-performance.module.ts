import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelPerformanceComponent } from './admin-panel-performance.component';
import {AdminPanelPerformanceRoutingModule} from "./admin-panel-performance-routing.module";
import {MatButton, MatIconButton} from "@angular/material/button";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import { AdminPanelPerformanceNewComponent } from './admin-panel-performance-new/admin-panel-performance-new.component';
import { AdminPanelPerformanceEditComponent } from './admin-panel-performance-edit/admin-panel-performance-edit.component';
import {MatError, MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatProgressBar} from "@angular/material/progress-bar";
import {ReactiveFormsModule} from "@angular/forms";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatAutocomplete, MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {MatIcon} from "@angular/material/icon";
import { AdminPanelPerformanceEditImplementersComponent } from './admin-panel-performance-edit/admin-panel-performance-edit-implementers/admin-panel-performance-edit-implementers.component';
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatCheckbox} from "@angular/material/checkbox";
import { AdminPanelPerformanceEditTicketPriceComponent } from './admin-panel-performance-edit/admin-panel-performance-edit-ticket-price/admin-panel-performance-edit-ticket-price.component';
import { AdminPanelPerformanceEditArtistComponent } from './admin-panel-performance-edit/admin-panel-performance-edit-artist/admin-panel-performance-edit-artist.component';
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import { AdminPanelPerformanceEditEventComponent } from './admin-panel-performance-edit/admin-panel-performance-edit-event/admin-panel-performance-edit-event.component';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";

@NgModule({
  declarations: [
    AdminPanelPerformanceComponent,
    AdminPanelPerformanceNewComponent,
    AdminPanelPerformanceEditComponent,
    AdminPanelPerformanceEditImplementersComponent,
    AdminPanelPerformanceEditTicketPriceComponent,
    AdminPanelPerformanceEditArtistComponent,
    AdminPanelPerformanceEditEventComponent
  ],
  imports: [
    CommonModule,
    AdminPanelPerformanceRoutingModule,
    MatButton,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    MatProgressBar,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatIconButton,
    MatIcon,
    MatSuffix,
    MatCardContent,
    MatCard,
    MatCheckbox,
    MatProgressSpinner,
    MatHint,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class AdminPanelPerformanceModule { }
