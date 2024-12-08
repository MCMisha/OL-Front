import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AuthGuard} from "../../guards/auth.guard";
import {AdminPanelMainComponent} from "./admin-panel-main/admin-panel-main.component";
import {AdminPanelGenreComponent} from "./admin-panel-genre/admin-panel-genre.component";

const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'prefix'},
  {path: 'main', component: AdminPanelMainComponent, canActivate: [AuthGuard]},
  {path: 'genre', component: AdminPanelGenreComponent, canActivate: [AuthGuard]},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule {}
