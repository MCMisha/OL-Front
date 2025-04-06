import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {Performance} from "../../models/performance";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AdminPerformanceService {

  constructor(private http: HttpClient) {}

  createPerformance(performance: Performance): Observable<Performance> {
    return this.http.post<Performance>(`${environment.baseApiUri}/AdminPerformance/new`, performance, {withCredentials: true});
  }

  getPerformances(): Observable<Performance[]> {
    return this.http.get<Performance[]>(`${environment.baseApiUri}/AdminPerformance/all`, {withCredentials: true}).pipe(catchError(this.handleError<Performance[]>('getPerformanceData')));
  }

  getPerformanceById(id: number): Observable<Performance> {
    return this.http.get<Performance>(`${environment.baseApiUri}/AdminPerformance/${id}`, {withCredentials: true});
  }

  updatePerformance(performance: Performance) : Observable<Performance> {
    return this.http.put<Performance>(`${environment.baseApiUri}/AdminPerformance/update`, performance, {withCredentials: true});
  }

  deletePerformance(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.baseApiUri}/AdminPerformance/delete/${id}`, {withCredentials: true});
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(`AdminPerformanceService: ${message}`);
  }
}
