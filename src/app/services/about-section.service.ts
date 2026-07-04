import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SectionList} from "../models/section-list";
import {environment} from "../../environments/environment";
import {SectionDetails} from "../models/section-details";

@Injectable({
  providedIn: 'root'
})
export class AboutSectionService {

  constructor(private http: HttpClient) { }

  getAboutSectionList(): Observable<SectionList[]> {
    return this.http.get<SectionList[]>(`${environment.baseApiUri}/AboutSection/all`);
  }

  getBySlug(slug: string): Observable<SectionDetails> {
    return this.http.get<SectionDetails>(`${environment.baseApiUri}/AboutSection/by-slug/${slug}`);
  }
}
