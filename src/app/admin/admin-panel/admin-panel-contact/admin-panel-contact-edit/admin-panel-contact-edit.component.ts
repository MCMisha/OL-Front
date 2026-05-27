import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AdminContactService} from "../../../../services/admin/admin-contact.service";

@Component({
  selector: 'app-admin-panel-contact-edit',
  templateUrl: './admin-panel-contact-edit.component.html',
  styleUrl: './admin-panel-contact-edit.component.scss'
})
export class AdminPanelContactEditComponent implements OnInit {
  aboutSectionForm!: FormGroup;
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private service: AdminContactService
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
      isVisible: [true],
      isMain: [false]
    });

    this.service.getById(this.id).subscribe(section => {
      if (!section) return;

      this.aboutSectionForm.patchValue({
        title: section.title,
        slug: section.slug,
        contentHtml: section.contentHtml,
        order: section.order,
        isVisible: section.isVisible,
        isMain: section.isMain
      });
    });
  }

  save() {
    this.service.updateContactSection(this.aboutSectionForm.value)
      .subscribe(() => this.router.navigate(['/admin/panel/contact']));
  }

  cancel() {
    this.router.navigate(['../..'], {relativeTo: this.route});
  }
}
