import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './admin-panel.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {RouterOutlet} from "@angular/router";
import {AdminPanelRoutingModule} from "./admin-panel-routing.module";
import { AdminPanelMainComponent } from './admin-panel-main/admin-panel-main.component';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatTooltip} from "@angular/material/tooltip";
import { AdminPanelSliderComponent } from './admin-panel-slider/admin-panel-slider.component';
import {MatProgressBar} from "@angular/material/progress-bar";
import {
  MatAccordion,
  MatExpansionPanel, MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";


@NgModule({
  declarations: [
    AdminPanelComponent,
    AdminPanelMainComponent,
    AdminPanelSliderComponent
  ],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    RouterOutlet,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatPaginator,
    MatHeaderRowDef,
    MatRowDef,
    MatRow,
    MatHeaderRow,
    MatTooltip,
    MatProgressBar,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription
  ]
})
export class AdminPanelModule { }
