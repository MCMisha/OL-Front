import {AfterViewInit, Component, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Comment} from "../../../models/comment";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Subject, Subscription, takeUntil} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AdminCommentService} from "../../../services/admin/admin-comment.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogConfirmComponent} from "../../../shared/dialog-confirm/dialog-confirm.component";

@Component({
  selector: 'app-admin-panel-comment',
  templateUrl: './admin-panel-comment.component.html',
  styleUrl: './admin-panel-comment.component.scss'
})
export class AdminPanelCommentComponent implements OnInit, AfterViewInit, OnDestroy {
  comments: Comment[] = [];
  displayedColumns = ['id', 'firstName', 'stars', 'performanceId', 'isShowing'];
  pageSize = 5;
  pageIndex = 0;
  paginatedComments: Comment[] = [];
  selectedRowIndex: any;
  selectedRow?: Comment;
  dataSourceWithPageSize = new MatTableDataSource(this.comments);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private subscription = new Subscription();
  private destroy$ = new Subject<void>();
  private _snackBar = inject(MatSnackBar);
  protected isLoading: boolean = true;

  constructor(
    private adminCommentService: AdminCommentService,
    protected dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.adminCommentService.getComments().pipe(takeUntil(this.destroy$)).subscribe(comments => {
      this.comments = comments;
      this.dataSourceWithPageSize.data = this.comments;
      this.isLoading = false;
    });
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSourceWithPageSize.paginator = this.paginator;
    } else {
      console.error('Paginator is not initialized.');
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.subscription.unsubscribe();
  }



  highlightRow(row: Comment) {
    if (this.selectedRowIndex == row.id) {
      this.selectedRowIndex = 0;
      this.selectedRow = undefined;
    } else {
      this.selectedRowIndex = row.id;
      this.selectedRow = row;
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '300px',
      data: {message: 'Czy na pewno chcesz usunąć ten element?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteComment();
      }
    });
  }

  deleteComment() {
    if (!!this.selectedRow?.id) {
      this.subscription.add(
        this.adminCommentService.deleteComment(this.selectedRow.id)
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            this.ngOnInit();
          }, resp => {
            this._snackBar.open(`Bląd podczas usunięcia: ${resp.error}`, 'Zamknij', {duration: 5000});
          })
      );
    }
  }
}
