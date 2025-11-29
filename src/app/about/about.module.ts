import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { AboutArtistsComponent } from './about-artists/about-artists.component';


@NgModule({
  declarations: [
    AboutComponent,
    AboutArtistsComponent
  ],
  imports: [
    CommonModule,
    AboutRoutingModule
  ]
})
export class AboutModule { }
