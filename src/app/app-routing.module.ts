import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PerformancesComponent} from "./performances/performances.component";
import {AdminComponent} from "./admin/admin.component";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./performances/performances.module').then(m => m.PerformancesModule),
    component: PerformancesComponent
  },
  { path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    component: AdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
