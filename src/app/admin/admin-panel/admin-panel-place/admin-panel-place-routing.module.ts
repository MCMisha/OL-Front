import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminPanelPlaceComponent} from "./admin-panel-place.component";

const routes: Routes = [
  {path: '', component: AdminPanelPlaceComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelPlaceRoutingModule { }
