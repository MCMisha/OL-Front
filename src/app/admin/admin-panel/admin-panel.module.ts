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



@NgModule({
  declarations: [
    AdminPanelComponent,
    AdminPanelMainComponent
  ],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    RouterOutlet
  ]
})
export class AdminPanelModule { }
