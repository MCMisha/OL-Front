import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminPanelNewsComponent} from "./admin-panel-news.component";
import {AdminPanelNewsNewComponent} from "./admin-panel-news-new/admin-panel-news-new.component";

const routes: Routes = [
  {path: '', component: AdminPanelNewsComponent},
  {path: 'new', component: AdminPanelNewsNewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelNewsRoutingModule { }
