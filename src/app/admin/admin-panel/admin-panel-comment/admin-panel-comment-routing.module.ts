import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminPanelCommentComponent} from "./admin-panel-comment.component";
import {AdminPanelCommentFormComponent} from "./admin-panel-comment-form/admin-panel-comment-form.component";

const routes: Routes = [
  {path: '', component: AdminPanelCommentComponent},
  {path: 'new', component: AdminPanelCommentFormComponent},
  {path: ':id/edit', component: AdminPanelCommentFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelCommentRoutingModule {
}
