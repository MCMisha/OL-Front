import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AdminCommentService} from "../../../../services/admin/admin-comment.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-admin-panel-comment-new',
  templateUrl: './admin-panel-comment-new.component.html',
  styleUrl: './admin-panel-comment-new.component.scss'
})
export class AdminPanelCommentNewComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  newCommentForm!: FormGroup;

  constructor(private commentService: AdminCommentService,
              private fb: FormBuilder,
              protected router: Router,
              protected route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.newCommentForm = this.fb.group({
      photo: [null, Validators.required],
      firstName: [null, Validators.required],
      stars: [null, Validators.required],
      performanceId: [null, Validators.required],
      comment: [null, Validators.required],

    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  protected saveComment() {

  }
}
