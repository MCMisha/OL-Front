import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminPanelAboutComponent} from "./admin-panel-about.component";
import {AdminPanelAboutNewComponent} from "./admin-panel-about-new/admin-panel-about-new.component";
import {AdminPanelAboutEditComponent} from "./admin-panel-about-edit/admin-panel-about-edit.component";

const routes: Routes = [
  {path: '', component: AdminPanelAboutComponent},
  {path: 'new', component: AdminPanelAboutNewComponent},
  {path: ':id/edit', component: AdminPanelAboutEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelAboutRoutingModule { }
