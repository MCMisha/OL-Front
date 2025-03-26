import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {UserService} from "../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit, OnDestroy {
  login: string = '';
  password: string = '';
  subscription = new Subscription();
  isLoading: boolean = false;
  private _snackBar = inject(MatSnackBar);

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  onLogin() {
    this.isLoading = true;
    this.subscription.add(
      this.userService.login(this.login, this.password).subscribe(_ => {
          this.router.navigate(['/admin/panel']);
          },
        resp => {
          this._snackBar.open(`Bląd podczas logowania: ${resp.error}`,'Zamknij', { duration: 5000 });
          this.isLoading = false;
        }
      )
    )
  }
}
