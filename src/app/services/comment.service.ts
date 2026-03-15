import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {CommentVm} from "../models/comment-vm";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {
  }

  getComments(): Observable<CommentVm[]> {
    return this.http.get<CommentVm[]>(`${environment.baseApiUri}/PublicComment/all`, {withCredentials: true})
  }
}
