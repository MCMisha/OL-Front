import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminPanelContactComponent} from "./admin-panel-contact.component";
import {AdminPanelContactNewComponent} from "./admin-panel-contact-new/admin-panel-contact-new.component";
import {AdminPanelContactEditComponent} from "./admin-panel-contact-edit/admin-panel-contact-edit.component";

const routes: Routes = [
  {path: '', component: AdminPanelContactComponent},
  {path: 'new', component: AdminPanelContactNewComponent},
  {path: ':id/edit', component: AdminPanelContactEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelContactRoutingModule { }
