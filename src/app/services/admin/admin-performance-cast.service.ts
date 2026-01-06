import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";
import {CastRowView} from "../../models/cast-row-view";
import {CastRow} from "../../models/cast-row";

@Injectable({
  providedIn: 'root'
})
export class AdminPerformanceCastService {
  private readonly baseApiUri = environment.baseApiUri;
  constructor(private http: HttpClient) { }

  getCast(performanceId: number): Observable<CastRowView[]> {
    const url = `${this.baseApiUri}/AdminPerformanceCast/${performanceId}/GetCast`;
    return this.http.get<CastRowView[]>(url, { withCredentials: true });
  }

  addCast(performanceId: number, payload: CastRow[]): Observable<void> {
    const url = `${this.baseApiUri}/AdminPerformanceCast/${performanceId}/AddCast`;
    return this.http.post<void>(url, payload, { withCredentials: true });
  }

  deleteCast(performanceId: number, artistId: number): Observable<void> {
    const url = `${this.baseApiUri}/AdminPerformanceCast/${performanceId}/DeleteCast/${artistId}`;
    return this.http.delete<void>(url, { withCredentials: true });
  }
}
