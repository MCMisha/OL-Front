import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {UpcomingEventVm} from "../models/upcoming-event-vm";
import {environment} from "../../environments/environment";
import {catchError, map} from "rxjs/operators";
import { UpcomingEvent } from "../models/upcoming-event";
import {PerformanceEvent} from "../models/performance-event";
import {EventInstanceInfo} from "../models/event-instance-info";
import {MinMaxDate} from "../models/min-max-date";

@Injectable({
  providedIn: 'root'
})
export class PerformanceEventService {

  constructor(private http: HttpClient) {}

  getNearestSixEvents(): Observable<UpcomingEventVm[]> {
    return this.http
      .get<UpcomingEvent[]>(`${environment.baseApiUri}/PerformanceEvent/nearest-six`)
      .pipe(
        map(dtos => (dtos ?? []).map(dto => ({
          eventId: dto.eventId,
          performanceId: dto.performanceId,
          startAt: new Date(dto.startAt),
          title: dto.title,
          genre: dto.genre,
          place: dto.place,
          imageUrl: dto.mainImage ? `data:image/jpeg;base64,${dto.mainImage}` : null,
          buyLink: dto.buyLink,
          isActive: dto.isActive
        }))),
        catchError(this.handleError<UpcomingEventVm[]>('getNearestSixEvents'))
      );
  }

  getMinMaxDates(): Observable<MinMaxDate> {
    return this.http.get<MinMaxDate>(`${environment.baseApiUri}/PerformanceEvent/min-max-date`);
  }

  getByMonth(monthYear: string): Observable<PerformanceEvent[]> {
    return this.http.get<PerformanceEvent[]>(`${environment.baseApiUri}/PerformanceEvent/by-month/${monthYear}`)
  }

  getEventDates(yearMonth: string): Observable<EventInstanceInfo[]> {
    return this.http.get<EventInstanceInfo[]>(`${environment.baseApiUri}/PerformanceEvent/by-month/${yearMonth}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(`PerformanceService: ${message}`);
  }
}
