import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TicketPriceGroup} from "../models/ticket-price-group";

@Injectable({
  providedIn: 'root'
})
export class TicketPriceService {

  private readonly baseApiUri = environment.baseApiUri;
  constructor(private http: HttpClient) { }

  getByPerformance(performanceId: number): Observable<TicketPriceGroup[]> {
    const url = `${this.baseApiUri}/TicketPrice/get-by-performance/${performanceId}`;
    return this.http.get<TicketPriceGroup[]>(url, { withCredentials: true });
  }
}
