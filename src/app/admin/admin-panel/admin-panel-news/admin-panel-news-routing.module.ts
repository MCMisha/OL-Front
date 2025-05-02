import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminPanelNewsComponent} from "./admin-panel-news.component";
import {AdminPanelNewsNewComponent} from "./admin-panel-news-new/admin-panel-news-new.component";
import {AdminPanelNewsEditComponent} from "./admin-panel-news-edit/admin-panel-news-edit.component";

const routes: Routes = [
  {path: '', component: AdminPanelNewsComponent},
  {path: 'new', component: AdminPanelNewsNewComponent},
  {path: ':id/edit', component: AdminPanelNewsEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelNewsRoutingModule { }
