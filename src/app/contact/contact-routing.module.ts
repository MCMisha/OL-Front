import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContactComponent} from './contact.component';
import {ContactMainComponent} from "./contact-main/contact-main.component";
import {ContactDetailsComponent} from "./contact-details/contact-details.component";

const routes: Routes = [
  {
    path: '', component: ContactComponent,
    children: [
      {path: '', component: ContactMainComponent},
      {path: ':slug', component: ContactDetailsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule {
}
