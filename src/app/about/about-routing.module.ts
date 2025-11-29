import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AboutComponent} from './about.component';
import {AboutArtistsComponent} from "./about-artists/about-artists.component";

const routes: Routes = [
  {
    path: '', component: AboutComponent,
    children: [
      {path: 'artists', component: AboutArtistsComponent},
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule {
}
