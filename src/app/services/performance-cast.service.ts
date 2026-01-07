import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {PerformanceCastEntity} from "../models/performance-cast-entity";

@Injectable({
  providedIn: 'root'
})
export class PerformanceCastService {
  private baseUrl: string = environment.baseApiUri;
  constructor(private http: HttpClient) {
  }

  getCast(performanceId: number) {
    return this.http.get<PerformanceCastEntity[]>(
      `${this.baseUrl}/PerformanceCast/${performanceId}/get-cast`
    );
  }

}
