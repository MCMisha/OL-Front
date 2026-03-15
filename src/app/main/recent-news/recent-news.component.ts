import {Component, OnDestroy, OnInit} from '@angular/core';
import {NewsStripItem} from "../../models/news-strip-item";
import {NewsService} from "../../services/news.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recent-news',
  templateUrl: './recent-news.component.html',
  styleUrl: './recent-news.component.scss'
})
export class RecentNewsComponent implements OnInit, OnDestroy {
  headerTitle = '_AKTUALNOŚCI';
  moreLink = '/news';

  items: NewsStripItem[] = [];
  subscription = new Subscription();
  constructor(private newsService: NewsService) {
  }

  ngOnInit() {
    this.subscription.add(
      this.newsService.getTwoRecent().subscribe(res => this.items = res)
    )
  }

  truncate(text: string, limit = 140) {
    return text.length > limit ? text.slice(0, limit) + '...' : text;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  formatDatePl(d: Date): string {
    const date = new Date(d);
    return date.toLocaleDateString('pl-PL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
}
