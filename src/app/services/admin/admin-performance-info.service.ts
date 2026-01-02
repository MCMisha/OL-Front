import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Implementer} from "../../models/implementer";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AdminPerformanceInfoService {

  constructor(private http: HttpClient) {
  }

  getImplementers(performanceId: number) {
    return this.http.get<Implementer[]>(
      `${environment.baseApiUri}/AdminPerformanceInfo/${performanceId}/implementers`, {withCredentials: true}
    );
  }

  addImplementers(performanceId: number, implementers: { implementers: any[] }) {
    return this.http.post<Implementer[]>(
      `${environment.baseApiUri}/AdminPerformanceInfo/${performanceId}/implementers`,
      implementers, {withCredentials: true}
    );
  }

  updateImplementer(performanceId: number, implementerId: number, implementer: Implementer) {
    return this.http.put<Implementer>(
      `${environment.baseApiUri}/AdminPerformanceInfo/${performanceId}/implementers/${implementerId}`,
      implementer, {withCredentials: true}
    );
  }

  deleteImplementer(performanceId: number, implementerId: number) {
    return this.http.delete<void>(
      `${environment.baseApiUri}/AdminPerformanceInfo/${performanceId}/implementers/${implementerId}`,
      {withCredentials: true}
    );
  }
}
