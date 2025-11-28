import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AdminNewsService} from "../../../services/admin/admin-news.service";
import {Subject, Subscription, takeUntil} from "rxjs";
import {News} from "../../../models/news";
import {MatTableDataSource} from "@angular/material/table";
import {DialogConfirmComponent} from "../../../shared/dialog-confirm/dialog-confirm.component";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-admin-panel-news',
  templateUrl: './admin-panel-news.component.html',
  styleUrl: './admin-panel-news.component.scss'
})
export class AdminPanelNewsComponent implements OnInit, AfterViewInit, OnDestroy {
  isLoading: boolean = true;
  selectedRow?: News;
  selectedRowIndex?: number;
  displayedColumns = ['id', 'title', 'subtitle', 'creationDate'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  news: News[] = [];
  subscription = new Subscription();
  private destroy$ = new Subject<void>();
  dataSourceWithPageSize = new MatTableDataSource(this.news);
  pageSize = 5;
  pageIndex = 0;

  constructor(
    private newsService: AdminNewsService,
    protected dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.subscription.add(
      this.newsService.getNews().subscribe(news => {
        this.news = news;
        this.dataSourceWithPageSize.data = this.news;
        this.isLoading = false;
      })
    );
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSourceWithPageSize.paginator = this.paginator;
    } else {
      console.error('Paginator is not initialized.');
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '300px',
      data: {message: 'Czy na pewno chcesz usunąć ten element?'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteNews();
      }
    });
  }

  highlightRow(row: any) {
    if (this.selectedRowIndex == row.id) {
      this.selectedRowIndex = 0;
      this.selectedRow = undefined;
    } else {
      this.selectedRowIndex = row.id;
      this.selectedRow = row;
    }
  }

  deleteNews() {
    if (!!this.selectedRow) {
      this.newsService.deleteNews(this.selectedRow.id!).pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.selectedRowIndex = -1;
        this.selectedRow = undefined;
        this.ngOnInit();
      });
    }
  }
}
