import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Genre} from "../../models/genre";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AdminGenreService {

  constructor(private http: HttpClient) { }

  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${environment.baseApiUri}/AdminGenre/all`, {withCredentials: true});
  }

  createGenre(genre: Genre): Observable<Genre> {
    return this.http.post<Genre>(`${environment.baseApiUri}/AdminGenre/create`, genre, {withCredentials: true});
  }

  updateGenre(genre: Genre): Observable<Genre> {
    return this.http.put<Genre>(`${environment.baseApiUri}/AdminGenre/update`, genre, {withCredentials: true});
  }

  deleteGenre(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.baseApiUri}/AdminGenre/delete/${id}`, {withCredentials: true});
  }
}
