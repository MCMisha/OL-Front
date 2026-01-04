import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Implementer} from "../models/implementer";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PerformanceInfoService {

  constructor(private http: HttpClient) {
  }

  getImplementers(performanceId: number) {
    return this.http.get<Implementer[]>(
      `${environment.baseApiUri}/PerformanceInfo/${performanceId}/implementers`, {withCredentials: true}
    );
  }
}
