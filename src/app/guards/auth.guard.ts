import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.userService.checkToken().pipe(
      map((res: any) => {
        if (res.isValid) {
          return true;
        } else {
          this.router.navigate(['..']);
          return false;
        }
      }),
      catchError((_) => {
        this.router.navigate(['..']);
        return of(false);
      })
    );
  }
}
