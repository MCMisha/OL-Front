import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminPanelPerformanceComponent} from "./admin-panel-performance.component";

const routes: Routes = [
  {path: '', component: AdminPanelPerformanceComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelPerformanceRoutingModule { }
