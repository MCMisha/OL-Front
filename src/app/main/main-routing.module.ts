import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./main.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'about',
    loadChildren: () => import('../about/about.module').then(m => m.AboutModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('../calendar/calendar.module').then(m => m.CalendarModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
