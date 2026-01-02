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
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatProgressBar} from "@angular/material/progress-bar";
import {ReactiveFormsModule} from "@angular/forms";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatAutocomplete, MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {MatIcon} from "@angular/material/icon";
import { AdminPanelPerformanceEditImplementersComponent } from './admin-panel-performance-edit/admin-panel-performance-edit-implementers/admin-panel-performance-edit-implementers.component';

@NgModule({
  declarations: [
    AdminPanelPerformanceComponent,
    AdminPanelPerformanceNewComponent,
    AdminPanelPerformanceEditComponent,
    AdminPanelPerformanceEditImplementersComponent
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
    MatSuffix
  ]
})
export class AdminPanelPerformanceModule { }
