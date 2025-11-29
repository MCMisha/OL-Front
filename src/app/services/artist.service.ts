import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Artist} from "../models/artist";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<Artist[]> {
    return this.http.get<Artist[]>(`${environment.baseApiUri}/Artist/all`);
  }
}
