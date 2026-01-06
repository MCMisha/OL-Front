import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TicketPriceGroup} from "../../models/ticket-price-group";

@Injectable({
  providedIn: 'root'
})
export class AdminTicketPriceService {
  private readonly baseApiUri = environment.baseApiUri;
  constructor(private http: HttpClient) { }

  getByPerformance(performanceId: number): Observable<TicketPriceGroup[]> {
    const url = `${this.baseApiUri}/AdminTicketPrice/get-by-performance/${performanceId}`;
    return this.http.get<TicketPriceGroup[]>(url, { withCredentials: true });
  }

  update(performanceId: number, payload: TicketPriceGroup[]): Observable<void> {
    const url = `${this.baseApiUri}/AdminTicketPrice/update/${performanceId}`;
    return this.http.put<void>(url, payload, { withCredentials: true });
  }
}
