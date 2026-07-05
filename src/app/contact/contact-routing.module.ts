import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContactComponent} from './contact.component';
import {ContactDetailsComponent} from "./contact-details/contact-details.component";

const routes: Routes = [
  {
    path: '', component: ContactComponent,
    children: [
      {path: '', component: ContactDetailsComponent},
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
