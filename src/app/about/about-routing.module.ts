import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AboutComponent} from './about.component';
import {AboutArtistsComponent} from "./about-artists/about-artists.component";
import {AboutDetailsComponent} from "./about-details/about-details.component";
import {AboutArtistsDetailsComponent} from "./about-artists/about-artists-details/about-artists-details.component";
import {AboutMainComponent} from "./about-main/about-main.component";
import {AboutPerformancesComponent} from "./about-performances/about-performances.component";

const routes: Routes = [
  {
    path: '', component: AboutComponent,
    children: [
      {path: '', component: AboutMainComponent},
      {path: 'artists', component: AboutArtistsComponent},
      {path: 'artists/:id', component: AboutArtistsDetailsComponent},
      {path: 'performances', component: AboutPerformancesComponent},
      {path: ':slug', component: AboutDetailsComponent}
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule {
}
