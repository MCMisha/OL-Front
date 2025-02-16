import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Place} from "../../models/place";

@Injectable({
  providedIn: 'root'
})
export class AdminPlaceService {

  constructor(private http: HttpClient) { }

  getPlaces(): Observable<Place[]> {
    return this.http.get<Place[]>(`${environment.baseApiUri}/AdminPlace/all`);
  }
}
