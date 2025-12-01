import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { AboutArtistsComponent } from './about-artists/about-artists.component';
import {MatFormField, MatLabel} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatProgressBar} from "@angular/material/progress-bar";


@NgModule({
  declarations: [
    AboutComponent,
    AboutArtistsComponent
  ],
  imports: [
    CommonModule,
    AboutRoutingModule,
    MatLabel,
    MatSelect,
    MatOption,
    MatFormField,
    MatProgressBar
  ]
})
export class AboutModule { }
