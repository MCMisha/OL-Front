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
    return this.http.get<Place[]>(`${environment.baseApiUri}/AdminPlace/all`, {withCredentials: true});
  }

  createPlace(place: Place): Observable<Place> {
    return this.http.post<Place>(`${environment.baseApiUri}/AdminPlace/new`, place, {withCredentials: true});
  }

  updatePlace(place: Place): Observable<Place> {
    return this.http.put<Place>(`${environment.baseApiUri}/AdminPlace/update/${place.id}`, place, {withCredentials: true});
  }

  deletePlace(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.baseApiUri}/AdminPlace/delete/${id}`, {withCredentials: true});
  }
}
