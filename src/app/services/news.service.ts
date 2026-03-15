import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {News} from "../models/news";
import {environment} from "../../environments/environment";
import {NewsStripItem} from "../models/news-strip-item";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getNews(): Observable<News[]> {
    return this.http.get<News[]>(`${environment.baseApiUri}/News/all`);
  }
  getTwoRecent(): Observable<NewsStripItem[]> {
    return this.http.get<NewsStripItem[]>(`${environment.baseApiUri}/News/two-recent`)
  }
  getNewsById(id: number): Observable<News> {
    return this.http.get<News>(`${environment.baseApiUri}/News/by-id/${id}`);
  }
}
