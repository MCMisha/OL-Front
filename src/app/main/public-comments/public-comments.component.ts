import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommentVm} from "../../models/comment-vm";
import {CommentService} from "../../services/comment.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-public-comments',
  templateUrl: './public-comments.component.html',
  styleUrl: './public-comments.component.scss'
})
export class PublicCommentsComponent implements OnInit, OnDestroy {
  comments: CommentVm[] = [];
  subscription = new Subscription();

  constructor(private commentService: CommentService) {
  }

  ngOnInit(): void {
    this.subscription.add(
      this.commentService.getComments().subscribe(res => {
        this.comments = res;
      })
    )
  }

  stars(n: number) {
    return Array.from({length: 5}, (_, i) => i < n);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
