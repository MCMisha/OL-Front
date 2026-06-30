import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {PerformancePhoto} from "../../models/performance-photo";
import {environment} from "../../../environments/environment";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AdminPerformancePhotoService {

  constructor(private http: HttpClient) {}

  getPerformancePhoto(performanceId: number): Observable<PerformancePhoto[]> {
    return this.http.get<PerformancePhoto[]>(`${environment.baseApiUri}/AdminPerformancePhoto/by-performance/${performanceId}`, {withCredentials: true})
      .pipe(catchError(this.handleError<PerformancePhoto[]>('getPerformancePhoto')));
  }

  addPerformancePhotos(performanceId: number, files: File[]): Observable<PerformancePhoto[]> {
    const formData = new FormData();

    files.forEach(file => {
      formData.append('photos', file);
    });

    return this.http.post<PerformancePhoto[]>(`${environment.baseApiUri}/AdminPerformancePhoto/create/${performanceId}`, formData, {withCredentials: true})
      .pipe(catchError(this.handleError<PerformancePhoto[]>('addPerformancePhoto')));
  }

  deletePerformancePhoto(performanceId: number, photoId: number): Observable<void> {
    const params = new HttpParams()
      .set('performanceId', performanceId);

    return this.http.delete<void>(
      `${environment.baseApiUri}/AdminPerformancePhoto/delete/${photoId}`,
      { params, withCredentials: true }
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
    console.log(`PerformancePhotoService: ${message}`);
  }
}
