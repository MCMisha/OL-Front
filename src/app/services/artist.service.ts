import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Artist} from "../models/artist";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ArtistDetails} from "../models/artist-details";

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<Artist[]> {
    return this.http.get<Artist[]>(`${environment.baseApiUri}/Artist/all`);
  }

  getAllMain(): Observable<Artist[]> {
    return this.http.get<Artist[]>(`${environment.baseApiUri}/Artist/all-main`);
  }

  getById(id: number): Observable<ArtistDetails> {
    return this.http.get<ArtistDetails>(`${environment.baseApiUri}/Artist/by-id/${id}`)
  }
}
