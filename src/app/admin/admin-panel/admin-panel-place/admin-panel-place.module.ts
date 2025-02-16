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



@NgModule({
  declarations: [
    AdminPanelPlaceComponent
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
    MatHeaderCellDef
  ]
})
export class AdminPanelPlaceModule { }
