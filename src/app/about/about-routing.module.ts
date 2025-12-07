import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AboutComponent} from './about.component';
import {AboutArtistsComponent} from "./about-artists/about-artists.component";
import {AboutDetailsComponent} from "./about-details/about-details.component";
import {AboutArtistsDetailsComponent} from "./about-artists/about-artists-details/about-artists-details.component";

const routes: Routes = [
  {
    path: '', component: AboutComponent,
    children: [
      {path: 'artists', component: AboutArtistsComponent},
      {path: 'artists/:id', component: AboutArtistsDetailsComponent},
      {path: ':slug', component: AboutDetailsComponent, pathMatch: 'full'},
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule {
}
