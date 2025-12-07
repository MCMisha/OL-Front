import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AdminAboutService} from "../../../../services/admin/admin-about.service";

@Component({
  selector: 'app-admin-panel-about-edit',
  templateUrl: './admin-panel-about-edit.component.html'
})
export class AdminPanelAboutEditComponent implements OnInit {
  aboutSectionForm!: FormGroup;
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private service: AdminAboutService
  ) {
  }

  ngOnInit() {
    this.id = Number(this.route.snapshot.params['id']);

    this.aboutSectionForm = this.fb.group({
      id: this.id,
      title: [''],
      slug: [''],
      contentHtml: [''],
      order: [1],
      isVisible: [true]
    });

    this.service.getById(this.id).subscribe(section => {
      if (!section) return;

      this.aboutSectionForm.patchValue({
        title: section.title,
        slug: section.slug,
        contentHtml: section.contentHtml,
        order: section.order,
        isVisible: section.isVisible
      });
    });
  }

  save() {
    this.service.updateAboutSection(this.aboutSectionForm.value)
      .subscribe(() => this.router.navigate(['/admin/panel/about-us']));
  }

  cancel() {
    this.router.navigate(['../..'], {relativeTo: this.route});
  }
}
