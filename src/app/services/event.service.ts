import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {PerformanceDatesTicket} from "../models/performance-dates-ticket";
import {Genre} from "../models/genre";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(private http: HttpClient) { }

  getEventDates(): Observable<PerformanceDatesTicket[]> {
    return this.http.get<PerformanceDatesTicket[]>(`${environment.baseApiUri}/event/dates`);
  }

  getGenre(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${environment.baseApiUri}/event/genre`);
  }
}
