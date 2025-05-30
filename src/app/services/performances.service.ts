import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {environment} from "../../environments/environment";
import {Performance} from "../models/performance";

@Injectable({
  providedIn: 'root'
})
export class PerformancesService {

  constructor(private http: HttpClient) {}
  getPerformances(): Observable<Performance[]> {
    return this.http.get<Performance[]>(`${environment.baseApiUri}/Performance/all`).pipe(catchError(this.handleError<Performance[]>('getPerformanceData')));
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
