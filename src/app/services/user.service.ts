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
    return this.http.post(`${environment.baseApiUri}/Admin/login`,
      {
        login: username,
        password: password
      },
      {withCredentials: true});
  }

  refresh() {
    return this.http.post(
      `${environment.baseApiUri}/Admin/refresh`,
      {},
      { withCredentials: true }
    );
  }

  verify(): Observable<any> {
    return this.http.get<any>(`${environment.baseApiUri}/Admin/verify`, {withCredentials: true});
  }

  logout() {
    return this.http.post(
      `${environment.baseApiUri}/Admin/logout`,
      {},
      { withCredentials: true }
    );
  }
}
