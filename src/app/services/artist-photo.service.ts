import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ArtistPhoto} from "../models/artist-photo";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ArtistPhotoService {

  constructor(private http: HttpClient) { }

  getArtistPhotos(artistId: number) : Observable<ArtistPhoto[]> {
    return this.http.get<ArtistPhoto[]>(`${environment.baseApiUri}/ArtistPhoto/by-artist/${artistId}`);
  }
}
