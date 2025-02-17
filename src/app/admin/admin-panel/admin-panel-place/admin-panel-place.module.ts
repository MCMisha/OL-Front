import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelPlaceComponent } from './admin-panel-place.component';
import { AdminPanelPlaceRoutingModule } from './admin-panel-place-routing.module';
import {MatButton} from "@angular/material/button";
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
import { AdminPanelPlaceNewComponent } from './admin-panel-place-new/admin-panel-place-new.component';
import { AdminPanelPlaceEditComponent } from './admin-panel-place-edit/admin-panel-place-edit.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatProgressBar} from "@angular/material/progress-bar";



@NgModule({
  declarations: [
    AdminPanelPlaceComponent,
    AdminPanelPlaceNewComponent,
    AdminPanelPlaceEditComponent
  ],
  imports: [
    CommonModule,
    AdminPanelPlaceRoutingModule,
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
    FormsModule,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    MatProgressBar,
    ReactiveFormsModule
  ]
})
export class AdminPanelPlaceModule { }
