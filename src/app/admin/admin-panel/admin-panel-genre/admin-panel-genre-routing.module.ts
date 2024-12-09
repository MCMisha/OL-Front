import {RouterModule, Routes} from "@angular/router";
import {AdminPanelGenreComponent} from "./admin-panel-genre.component";
import {AdminPanelGenreEditComponent} from "./admin-panel-genre-edit/admin-panel-genre-edit.component";
import {AdminPanelGenreNewComponent} from "./admin-panel-genre-new/admin-panel-genre-new.component";
import {NgModule} from "@angular/core";

const routes: Routes = [
  {path: '', component: AdminPanelGenreComponent},
  {path: 'new', component: AdminPanelGenreNewComponent},
  {path: ':id/edit', component: AdminPanelGenreEditComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelGenreRoutingModule {}
