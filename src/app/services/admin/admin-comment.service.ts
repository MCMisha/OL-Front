import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Comment} from "../../models/comment";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AdminCommentService {

  constructor(private http: HttpClient) {
  }

  getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${environment.baseApiUri}/AdminPublicComment/all`, {withCredentials: true})
  }

  getCommentById(id: number): Observable<Comment> {
    return this.http.get<Comment>(`${environment.baseApiUri}/AdminPublicComment/by-id/${id}`, {withCredentials: true})
  }

  createComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${environment.baseApiUri}/AdminPublicComment/create`, comment, {withCredentials: true});
  }

  updateComment(comment: Comment): Observable<Comment> {
    return this.http.put<Comment>(`${environment.baseApiUri}/AdminPublicComment/update`, comment, {withCredentials: true});
  }

  deleteComment(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.baseApiUri}/AdminPublicComment/delete/${id}`, {withCredentials: true});
  }
}
