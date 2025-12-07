import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { AboutArtistsComponent } from './about-artists/about-artists.component';
import {MatFormField, MatLabel} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatProgressBar} from "@angular/material/progress-bar";
import { AboutDetailsComponent } from './about-details/about-details.component';
import { AboutArtistsDetailsComponent } from './about-artists/about-artists-details/about-artists-details.component';
import {MatButton} from "@angular/material/button";


@NgModule({
  declarations: [
    AboutComponent,
    AboutArtistsComponent,
    AboutDetailsComponent,
    AboutArtistsDetailsComponent
  ],
    imports: [
        CommonModule,
        AboutRoutingModule,
        MatLabel,
        MatSelect,
        MatOption,
        MatFormField,
        MatProgressBar,
        MatButton
    ]
})
export class AboutModule { }
