import {Injectable} from '@angular/core';
import {AdminPerformanceEventRowDto} from "../../models/admin-performance-event-row-dto";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {PerformanceEventUpdateDto} from "../../models/performance-event-update-dto";

@Injectable({
  providedIn: 'root'
})
export class AdminPerformanceEventService {

  private baseUrl = `${environment.baseApiUri}/AdminPerformanceEvent`;

  constructor(private http: HttpClient) {
  }

  getEventsByPerformance(performanceId: number): Observable<AdminPerformanceEventRowDto[]> {
    return this.http.get<AdminPerformanceEventRowDto[]>(
      `${this.baseUrl}/by-performance/${performanceId}`, {withCredentials: true}
    );
  }

  replaceEvents(performanceId: number, body: PerformanceEventUpdateDto[]): Observable<string> {
    return this.http.put<string>(
      `${this.baseUrl}/performance/${performanceId}/update`, body, {withCredentials: true}
    );
  }
}
