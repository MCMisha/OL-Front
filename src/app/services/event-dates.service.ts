import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {PerformanceDatesTicket} from "../models/performance-dates-ticket";

@Injectable({
  providedIn: 'root'
})
export class EventDatesService {
  constructor(private http: HttpClient) { }

  getEventDates(): Observable<PerformanceDatesTicket[]> {
    return this.http.get<PerformanceDatesTicket[]>(`${environment.baseApiUri}/event-dates`);
  }
}
