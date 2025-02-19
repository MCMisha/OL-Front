import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminPanelPerformanceComponent} from "./admin-panel-performance.component";
import {AdminPanelPerformanceNewComponent} from "./admin-panel-performance-new/admin-panel-performance-new.component";
import {
  AdminPanelPerformanceEditComponent
} from "./admin-panel-performance-edit/admin-panel-performance-edit.component";

const routes: Routes = [
  {path: '', component: AdminPanelPerformanceComponent},
  {path: 'new', component: AdminPanelPerformanceNewComponent},
  {path: ':id/edit', component: AdminPanelPerformanceEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelPerformanceRoutingModule { }
