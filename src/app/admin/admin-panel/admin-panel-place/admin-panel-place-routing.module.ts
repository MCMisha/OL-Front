import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminPanelPlaceComponent} from "./admin-panel-place.component";
import {AdminPanelPlaceNewComponent} from "./admin-panel-place-new/admin-panel-place-new.component";
import {AdminPanelPlaceEditComponent} from "./admin-panel-place-edit/admin-panel-place-edit.component";

const routes: Routes = [
  {path: '', component: AdminPanelPlaceComponent},
  {path: 'new', component: AdminPanelPlaceNewComponent},
  {path: ':id/edit', component: AdminPanelPlaceEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelPlaceRoutingModule { }
