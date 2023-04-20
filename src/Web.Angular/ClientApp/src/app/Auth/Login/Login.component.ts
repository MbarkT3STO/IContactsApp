import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../../Models/Auth/loginModel';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/Auth/Auth.service';
import { IdentityService } from '../../Services/Identity/Identity.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css'],
})
export class LoginComponent implements OnInit {
  model: LoginModel = new LoginModel();

  constructor(
    private router: Router,
    private auth: AuthService,
    private identity: IdentityService,
    private cookieService:CookieService
  ) {}

  ngOnInit() {
    if (this.auth.IsLoggedIn()) {
      this.auth.CheckUser();
    }
  }

  login() {
    this.auth.Login(this.model).subscribe(
      (response) => {
        if (response.isSucceeded) {

          this.cookieService.set('userId', response.userId);
          this.cookieService.set('username', response.username);
          this.cookieService.set('token', response.token);
          this.cookieService.set('createdAt', response.createdAt);
          this.cookieService.set('expiresAt', response.expiresAt);
          this.cookieService.set('refreshToken', response.refreshToken);

          this.router.navigate(['/User-Dashboard']);
        }
      },
      (error) => {
        alert(error.error);
      }
    );
  }
}
