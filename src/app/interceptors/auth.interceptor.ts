import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const requestWithCredentials = req.clone({
      withCredentials: true
    });

    return next.handle(requestWithCredentials).pipe(
      catchError((error: HttpErrorResponse) => {
        const isLoginRequest = req.url.includes('/Admin/login');
        const isRefreshRequest = req.url.includes('/Admin/refresh');

        if (error.status === 401 && !isLoginRequest && !isRefreshRequest) {
          return this.userService.refresh().pipe(
            switchMap(() => {
              return next.handle(requestWithCredentials);
            }),
            catchError(refreshError => {
              this.router.navigate(['/admin']);
              return throwError(() => refreshError);
            })
          );
        }

        return throwError(() => error);
      })
    );
  }
}
