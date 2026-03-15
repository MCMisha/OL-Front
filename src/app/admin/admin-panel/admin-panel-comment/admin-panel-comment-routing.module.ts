import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminPanelCommentComponent} from "./admin-panel-comment.component";
import {AdminPanelCommentNewComponent} from "./admin-panel-comment-new/admin-panel-comment-new.component";
import {AdminPanelCommentEditComponent} from "./admin-panel-comment-edit/admin-panel-comment-edit.component";

const routes: Routes = [
  {path: '', component: AdminPanelCommentComponent},
  {path: 'new', component: AdminPanelCommentNewComponent},
  {path: ':id/edit', component: AdminPanelCommentEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelCommentRoutingModule {
}
