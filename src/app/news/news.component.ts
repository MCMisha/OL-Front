import {Component, OnDestroy, OnInit} from '@angular/core';
import {NewsService} from "../services/news.service";
import {News} from "../models/news";
import {Subscription} from "rxjs";
import {NewsCategoryLabels} from "../models/enums/news-category-labels";
import {NewsCategory} from "../models/enums/news-category.enum";


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent implements OnInit, OnDestroy {
  news: News[] = [];
  subscription = new Subscription();
  isLoading: boolean = true;
  categoryFilters: { label: string; value: NewsCategory | 'all' }[] = [
    {label: 'Wszystkie', value: 'all'},
    ...NewsCategoryLabels
  ];

  seasons = ['2025/2026', '2024/2025', '2023/2024', '2022/2023', '2021/2022'];

  selectedCategory: NewsCategory | 'all' = 'all';
  selectedSeason = '2025/2026';


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

  selectCategory(category: NewsCategory | 'all') {
    this.selectedCategory = category;
  }

  selectSeason(season: string) {
    this.selectedSeason = season;
  }

  get filteredNews() {
    return this.news
      .filter(n => this.getSeason(n.creationDate) === this.selectedSeason)
      .filter(n => {
        if (this.selectedCategory === 'all') {
          return true;
        }

        return n.category === this.selectedCategory;
      })
      .sort((a, b) =>
        new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
      );
  }

  getSeason(date: string | Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;

    return month >= 9
      ? `${year}/${year + 1}`
      : `${year - 1}/${year}`;
  }

  protected getNewsCategoryLabel(n: News) {
    return NewsCategoryLabels.find(c => c.value === n.category)?.label ?? 'Nieznana kategoria';
  }
}
