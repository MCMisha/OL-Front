import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AdminNewsService} from "../../../services/admin/admin-news.service";
import {Subscription} from "rxjs";
import {News} from "../../../models/news";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-admin-panel-news',
  templateUrl: './admin-panel-news.component.html',
  styleUrl: './admin-panel-news.component.scss'
})
export class AdminPanelNewsComponent implements OnInit, OnDestroy {
  isLoading: boolean = true;
  selectedRow?: News;
  selectedRowIndex?: number;
  displayedColumns = ['id', 'title', 'subtitle', 'creationDate'];

  news: News[] = [];
  subscription = new Subscription();
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openDialog() {

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

}
