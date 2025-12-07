import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AboutSectionList} from "../../models/about-section-list";
import {environment} from "../../../environments/environment";
import {AboutSectionCreate} from "../../models/about-section-create";
import {AboutSection} from "../../models/about-section";

@Injectable({
  providedIn: 'root'
})
export class AdminAboutService {

  constructor(private http: HttpClient) {
  }

  getAboutSectionList(): Observable<AboutSectionList[]> {
    return this.http.get<AboutSectionList[]>(`${environment.baseApiUri}/AdminAboutSection/all`, {withCredentials: true});
  }

  createAboutSection(aboutSection: AboutSectionCreate): Observable<AboutSection> {
    return this.http.post<AboutSection>(`${environment.baseApiUri}/AdminAboutSection/create`, aboutSection, {withCredentials: true});
  }

  updateAboutSection(aboutSection: AboutSection): Observable<AboutSection> {
    return this.http.put<AboutSection>(`${environment.baseApiUri}/AdminAboutSection/update`, aboutSection, {withCredentials: true});
  }

  updateOrder(payload: { id: number; order: number }[]) {
    return this.http.put(`${environment.baseApiUri}/AdminAboutSection/update-order`, payload, {withCredentials: true});
  }

  deleteAboutSection(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.baseApiUri}/AdminAboutSection/delete/${id}`, {withCredentials: true});
  }

  getById(id: number): Observable<AboutSection> {
    return this.http.get<AboutSection>(`${environment.baseApiUri}/AdminAboutSection/by-id/${id}`, {withCredentials: true});
  }
}
