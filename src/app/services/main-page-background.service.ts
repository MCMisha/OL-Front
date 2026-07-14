import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {MainPageBackgroundDto} from "../models/main-page-background-dto";

@Injectable({
  providedIn: 'root'
})
export class MainPageBackgroundService {

  constructor(private http: HttpClient) { }

  getAllActive(): Observable<MainPageBackgroundDto[]> {
    return this.http.get<MainPageBackgroundDto[]>(`${environment.baseApiUri}/MainPageBackground/all-active`);
  }
}
