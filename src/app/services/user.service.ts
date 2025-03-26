import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<any> {
    const encodedLogin = encodeURIComponent(username);
    const encodedPassword = encodeURIComponent(password);
    return this.http.post(`${environment.baseApiUri}/Admin/login?login=${encodedLogin}&password=${encodedPassword}`,
      null,
      {withCredentials: true});
  }

  checkToken(): Observable<any> {
    return this.http.get<any>(`${environment.baseApiUri}/Admin/verify`, {withCredentials: true});
  }
}
