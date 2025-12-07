import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AdminAboutService} from "../../../../services/admin/admin-about.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-admin-panel-about-new',
  templateUrl: './admin-panel-about-new.component.html',
  styleUrl: './admin-panel-about-new.component.scss'
})
export class AdminPanelAboutNewComponent implements OnInit, OnDestroy {
  aboutSectionForm!: FormGroup;
  subscription = new Subscription();
  constructor(
    private fb: FormBuilder,
    private service: AdminAboutService,
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
      isVisible: [true]
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  save() {
    this.subscription.add(
      this.service.createAboutSection(this.aboutSectionForm.value).subscribe(() => {
        this.router.navigate(['/admin/panel/about-us']);
      })
    );
  }

  cancel() {
    this.router.navigate(['..'], {relativeTo: this.route});
  }
}
