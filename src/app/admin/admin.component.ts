import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {UserService} from "../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit, OnDestroy {
  login: string = '';
  password: string = '';
  subscription = new Subscription();

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
    this.subscription.add(
      this.userService.login(this.login, this.password).subscribe(res => {
        localStorage.setItem('token', res);
        console.log('token taken')
        this.router.navigate(['panel'], {relativeTo:this.route});
      })
    )
  }
}
