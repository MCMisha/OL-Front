import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelPerformanceComponent } from './admin-panel-performance.component';
import {AdminPanelPerformanceRoutingModule} from "./admin-panel-performance-routing.module";
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
    AdminPanelPerformanceComponent,
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
    MatHeaderCellDef
  ]
})
export class AdminPanelPerformanceModule { }
