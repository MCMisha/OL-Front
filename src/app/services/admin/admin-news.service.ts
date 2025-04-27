import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {News} from "../../models/news";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AdminNewsService {

  constructor(private http: HttpClient) { }

  getNews(): Observable<News[]> {
    return this.http.get<News[]>(`${environment.baseApiUri}/AdminNews/all`, {withCredentials: true});
  }

  createNews(news: News): Observable<News> {
    return this.http.post<News>(`${environment.baseApiUri}/AdminNews/create`, news, {withCredentials: true});
  }
}
