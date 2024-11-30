import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";
import {environment} from "../../environments/environment";
import {Performance} from "../models/performance";
import {PerformanceDisplay} from "../models/performance-display";

@Injectable({
  providedIn: 'root'
})
export class PerformancesService {

  constructor(private http: HttpClient) {}
  private cache = new Map<string, PerformanceDisplay[]>();

  getPerformances(): Observable<Performance[]> {
    return this.http.get<Performance[]>(`${environment.baseApiUri}/Performance`).pipe(catchError(this.handleError<Performance[]>('getPerformanceData')));
  }

  getPerformancesByDate(date: string): Observable<PerformanceDisplay[]> {
    if (this.cache.has(date)) {
      return of(this.cache.get(date)!);
    }

    return this.http.get<PerformanceDisplay[]>(`${environment.baseApiUri}/Performance/${date}`).pipe(
      tap(data => this.cache.set(date, data))
    );
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
