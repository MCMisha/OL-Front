import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {EventInstanceInfo} from "../models/EventInstanceInfo";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(private http: HttpClient) { }

  getEventDates(yearMonth: string): Observable<EventInstanceInfo[]> {
    return this.http.get<any[]>(`${environment.baseApiUri}/event/${yearMonth}`);
  }

}
