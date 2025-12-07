import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AboutSectionList} from "../models/about-section-list";
import {environment} from "../../environments/environment";
import {AboutSectionDetails} from "../models/about-section-details";

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  constructor(private http: HttpClient) { }

  getAboutSectionList(): Observable<AboutSectionList[]> {
    return this.http.get<AboutSectionList[]>(`${environment.baseApiUri}/AboutSection/all`);
  }

  getBySlug(slug: string): Observable<AboutSectionDetails> {
    return this.http.get<AboutSectionDetails>(`${environment.baseApiUri}/AboutSection/by-slug/${slug}`);
  }
}
