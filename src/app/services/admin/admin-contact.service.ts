import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {SectionList} from "../../models/section-list";
import {environment} from "../../../environments/environment";
import {AboutSectionCreate} from "../../models/about-section-create";
import {AboutSection} from "../../models/about-section";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AdminContactService {

  constructor(private http: HttpClient) {
  }

  getContactSectionList(): Observable<SectionList[]> {
    return this.http.get<SectionList[]>(`${environment.baseApiUri}/AdminContactSection/all`, {withCredentials: true});
  }

  createContactSection(aboutSection: AboutSectionCreate): Observable<AboutSection> {
    return this.http.post<AboutSection>(`${environment.baseApiUri}/AdminContactSection/create`, aboutSection, {withCredentials: true});
  }

  updateContactSection(aboutSection: AboutSection): Observable<AboutSection> {
    return this.http.put<AboutSection>(`${environment.baseApiUri}/AdminContactSection/update`, aboutSection, {withCredentials: true});
  }

  updateOrder(payload: { id: number; order: number }[]) {
    return this.http.put(`${environment.baseApiUri}/AdminContactSection/update-order`, payload, {withCredentials: true});
  }

  deleteContactSection(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.baseApiUri}/AdminContactSection/delete/${id}`, {withCredentials: true});
  }

  getById(id: number): Observable<AboutSection> {
    return this.http.get<AboutSection>(`${environment.baseApiUri}/AdminContactSection/by-id/${id}`, {withCredentials: true});
  }

  updateMain(id: number): Observable<AboutSection> {
    return this.http.put<AboutSection>(`${environment.baseApiUri}/AdminContactSection/update-main?id=${id}`, null, {withCredentials: true});
  }
}
