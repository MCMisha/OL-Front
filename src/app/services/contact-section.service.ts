import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SectionList} from "../models/section-list";
import {environment} from "../../environments/environment";
import {SectionDetails} from "../models/section-details";

@Injectable({
  providedIn: 'root'
})
export class ContactSectionService {

  constructor(private http: HttpClient) { }

  getContactSectionList(): Observable<SectionList[]> {
    return this.http.get<SectionList[]>(`${environment.baseApiUri}/ContactSection/all`);
  }

  getBySlug(slug: string): Observable<SectionDetails> {
    return this.http.get<SectionDetails>(`${environment.baseApiUri}/ContactSection/by-slug/${slug}`);
  }
}
