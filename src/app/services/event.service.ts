import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {EventInstanceInfo} from "../models/event-instance-info";
import {MinMaxDate} from "../models/min-max-date";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(private http: HttpClient) { }

  getEventDates(yearMonth: string): Observable<EventInstanceInfo[]> {
    return this.http.get<EventInstanceInfo[]>(`${environment.baseApiUri}/event/${yearMonth}`);
  }

  getMinMaxDates(): Observable<MinMaxDate> {
    return this.http.get<MinMaxDate>(`${environment.baseApiUri}/event/minmaxdates`);
  }

}
