import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {PerformancePhoto} from "../models/performance-photo";
import {environment} from "../../environments/environment";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PerformancePhotoService {

  constructor(private http: HttpClient) {}

  getPerformancePhoto(performanceId: number): Observable<PerformancePhoto[]> {
    return this.http.get<PerformancePhoto[]>(`${environment.baseApiUri}/PerformancePhoto/by-performance/${performanceId}`)
      .pipe(catchError(this.handleError<PerformancePhoto[]>('getPerformancePhoto')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(`PerformancePhotoService: ${message}`);
  }
}
