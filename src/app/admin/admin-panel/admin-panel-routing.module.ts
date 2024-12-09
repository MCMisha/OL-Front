import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AuthGuard} from "../../guards/auth.guard";
import {AdminPanelMainComponent} from "./admin-panel-main/admin-panel-main.component";

const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'prefix'},
  {path: 'main', component: AdminPanelMainComponent, canActivate: [AuthGuard]},
  {
    path: 'genre', loadChildren: () =>
      import('./admin-panel-genre/admin-panel-genre.module').then(
        (m) => m.AdminPanelGenreModule
      ),
    canActivate: [AuthGuard]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule {
}
