import {Component, OnDestroy, OnInit} from '@angular/core';
import {NewsService} from "../services/news.service";
import {News} from "../models/news";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent implements OnInit, OnDestroy {
  news: News[] = [];
  subscription = new Subscription();
  isLoading: boolean = true;

  constructor(private newsService: NewsService) {
  }

  ngOnInit(): void {
    this.subscription.add(
      this.newsService.getNews().subscribe(news => {
        this.news = news;
        this.isLoading = false;
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
