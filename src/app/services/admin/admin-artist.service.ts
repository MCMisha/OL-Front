import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Artist} from "../../models/artist";

@Injectable({
  providedIn: 'root'
})
export class AdminArtistService {

  constructor(private http: HttpClient) {
  }

  getArtists(): Observable<Artist[]> {
    return this.http.get<Artist[]>(`${environment.baseApiUri}/AdminArtist/all`, {withCredentials: true});
  }

  createArtist(artist: Artist): Observable<Artist> {
    return this.http.post<Artist>(`${environment.baseApiUri}/AdminArtist/create`, artist, {withCredentials: true});
  }

  updateArtist(artist: Artist): Observable<Artist> {
    return this.http.put<Artist>(`${environment.baseApiUri}/AdminArtist/update`, artist, {withCredentials: true});
  }

  deleteArtist(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.baseApiUri}/AdminArtist/delete/${id}`, {withCredentials: true});
  }

  getArtistById(id: number): Observable<Artist> {
    return this.http.get<Artist>(`${environment.baseApiUri}/AdminArtist/${id}`, {withCredentials: true});
  }
}
