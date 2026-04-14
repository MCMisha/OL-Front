import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MainPageBackground} from "../models/main-page-background";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MainPageBackgroundService {

  constructor(private http: HttpClient) { }

  getAllActive(): Observable<MainPageBackground[]> {
    return this.http.get<MainPageBackground[]>(`${environment.baseApiUri}/MainPageBackground/all-active`);
  }
}
