import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MainPageBackground} from "../../models/main-page-background";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AdminMainPageBackgroundService {

  constructor(private http: HttpClient) { }

  create(mainPageBackground: MainPageBackground): Observable<MainPageBackground> {
    return this.http.post<MainPageBackground>(`${environment.baseApiUri}/AdminMainBackground/create`, mainPageBackground, {withCredentials: true});
  }

  getAll(): Observable<MainPageBackground[]> {
    return this.http.get<MainPageBackground[]>(`${environment.baseApiUri}/AdminMainBackground/all`, {withCredentials: true});
  }

  getById(id: number): Observable<MainPageBackground> {
    return this.http.get<MainPageBackground>(`${environment.baseApiUri}/AdminMainBackground/${id}`, {withCredentials: true});
  }

  update(mainPageBackground: MainPageBackground): Observable<MainPageBackground> {
    return this.http.put<MainPageBackground>(`${environment.baseApiUri}/AdminMainBackground/update/${mainPageBackground.id}`, mainPageBackground, {withCredentials: true});
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.baseApiUri}/AdminMainBackground/delete/${id}`, {withCredentials: true});
  }
}
