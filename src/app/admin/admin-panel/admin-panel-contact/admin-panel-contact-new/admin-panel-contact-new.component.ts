import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {AdminContactService} from "../../../../services/admin/admin-contact.service";

@Component({
  selector: 'app-admin-panel-contact-new',
  templateUrl: './admin-panel-contact-new.component.html',
  styleUrl: './admin-panel-contact-new.component.scss'
})
export class AdminPanelContactNewComponent implements OnInit, OnDestroy {
  aboutSectionForm!: FormGroup;
  subscription = new Subscription();
  constructor(
    private fb: FormBuilder,
    private service: AdminContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.aboutSectionForm = this.fb.group({
      title: [''],
      slug: [''],
      contentHtml: [''],
      order: [0],
      isVisible: [true],
      type: [1]
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  save() {
    this.subscription.add(
      this.service.createContactSection(this.aboutSectionForm.value).subscribe(() => {
        this.router.navigate(['/admin/panel/contact']);
      })
    );
  }

  cancel() {
    this.router.navigate(['..'], {relativeTo: this.route});
  }
}
