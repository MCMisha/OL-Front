import {Component, OnDestroy, OnInit} from '@angular/core';
import {News} from "../../models/news";
import {Subscription} from "rxjs";
import {NewsService} from "../../services/news.service";
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrl: './news-details.component.scss'
})
export class NewsDetailsComponent implements OnInit, OnDestroy {
  isLoading: boolean = true;
  news?: News;
  safeContent?: SafeHtml;
  subscription = new Subscription();

  constructor(private newsService: NewsService,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit(): void {
    this.subscription.add(
      this.route.params.subscribe(params => {
        if (params['id']) {
          const id = +params['id'];
          this.loadNews(id);
          this.isLoading = false;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private loadNews(id: number): void {
    this.subscription.add(
      this.newsService.getNewsById(id).subscribe(news => {
        this.news = news;
        this.safeContent = this.sanitizer.bypassSecurityTrustHtml(news.content ?? '');
        this.isLoading = false;
      })
    );
  }
}
