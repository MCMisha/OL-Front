import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { ContactMainComponent } from './contact-main/contact-main.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import {MatProgressBar} from "@angular/material/progress-bar";


@NgModule({
  declarations: [
    ContactComponent,
    ContactMainComponent,
    ContactDetailsComponent
  ],
    imports: [
        CommonModule,
        ContactRoutingModule,
        MatProgressBar
    ]
})
export class ContactModule { }
