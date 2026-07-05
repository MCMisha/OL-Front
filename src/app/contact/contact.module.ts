import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import {MatProgressBar} from "@angular/material/progress-bar";


@NgModule({
  declarations: [
    ContactComponent,
    ContactDetailsComponent
  ],
    imports: [
        CommonModule,
        ContactRoutingModule,
        MatProgressBar
    ]
})
export class ContactModule { }
