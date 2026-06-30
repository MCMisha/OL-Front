import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {ArtistPerformanceCastDto} from "../models/artist-performance-cast-dto";

@Injectable({
  providedIn: 'root'
})
export class PerformanceCastService {
  private baseUrl: string = environment.baseApiUri;
  constructor(private http: HttpClient) {
  }

  getCast(performanceId: number) {
    return this.http.get<ArtistPerformanceCastDto[]>(
      `${this.baseUrl}/PerformanceCast/${performanceId}/get-cast`
    );
  }

}
