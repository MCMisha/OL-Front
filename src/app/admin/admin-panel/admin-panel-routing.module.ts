import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AdminPanelMainComponent} from "./admin-panel-main/admin-panel-main.component";

const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'prefix'},
  {path: 'main', component: AdminPanelMainComponent},
  {
    path: 'genre', loadChildren: () =>
      import('./admin-panel-genre/admin-panel-genre.module').then(
        (m) => m.AdminPanelGenreModule
      )
  },
  {
    path: 'place', loadChildren: () =>
      import('./admin-panel-place/admin-panel-place.module').then(
        (m) => m.AdminPanelPlaceModule
      )
  },
  {
    path: 'performance', loadChildren: () =>
      import('./admin-panel-performance/admin-panel-performance.module').then(
        (m) => m.AdminPanelPerformanceModule
      )
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule {
}
