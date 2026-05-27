import { Injectable } from '@angular/core';
import {ArtistPhoto} from "../../models/artist-photo";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AdminArtistPhotoService {

  constructor(private http: HttpClient) {}

  getArtistPhotos(artistId: number): Observable<ArtistPhoto[]> {
    return this.http.get<ArtistPhoto[]>(
      `${environment.baseApiUri}/AdminArtistPhoto/by-artist/${artistId}`, {withCredentials: true}
    );
  }

  getArtistPhotoById(artistId: number, photoId: number): Observable<ArtistPhoto> {

    return this.http.get<ArtistPhoto>(
      `${environment.baseApiUri}/AdminArtistPhoto/by-artist/${artistId}/by-id/${photoId}`,
      { withCredentials: true }
    );
  }

  addArtistPhotos(artistId: number, files: File[]): Observable<ArtistPhoto[]> {
    const formData = new FormData();

    files.forEach(file => {
      formData.append('photos', file);
    });

    const params = new HttpParams()
      .set('artistId', artistId);

    return this.http.post<ArtistPhoto[]>(
      `${environment.baseApiUri}/AdminArtistPhoto/create`,
      formData,
      { params, withCredentials: true }
    );
  }

  updateArtistPhoto(
    artistId: number,
    photoId: number,
    file: File
  ): Observable<ArtistPhoto> {
    const formData = new FormData();
    formData.append('photo', file);

    const params = new HttpParams()
      .set('artistId', artistId);

    return this.http.put<ArtistPhoto>(
      `${environment.baseApiUri}/AdminArtistPhoto/update/${photoId}`,
      formData,
      { params, withCredentials: true }
    );
  }

  deleteArtistPhoto(artistId: number, photoId: number): Observable<void> {
    const params = new HttpParams()
      .set('artistId', artistId);

    return this.http.delete<void>(
      `${environment.baseApiUri}/AdminArtistPhoto/delete/${photoId}`,
      { params, withCredentials: true }
    );
  }}
