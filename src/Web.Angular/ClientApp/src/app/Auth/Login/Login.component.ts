import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../../Models/Auth/loginModel';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/Auth/Auth.service';
import { IdentityService } from '../../Services/Identity/Identity.service';
import { CookieService } from 'ngx-cookie-service';
import { async } from '@angular/core/testing';
import { LoginResponseModel } from 'src/app/Models/Auth/LoginResponseModel';

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
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    if (this.auth.IsLoggedIn()) {
      async () => await this.auth.RedirectToDashboard();
    }
  }

  async login() {
    this.auth.Login(this.model).subscribe(
      async (response) => {
        if (response.isSucceeded) {

          localStorage.setItem('userId', response.userId);
          localStorage.setItem('username', response.username);

          localStorage.setItem('token', response.token);
          localStorage.setItem('createdAt', response.createdAt);
          localStorage.setItem('expiresAt', response.expiresAt);
          localStorage.setItem('refreshToken', response.refreshToken);



          var isUserInAdminRule = await this.identity.IsUserInRole(response.userId, 'admin').toPromise();

          if (isUserInAdminRule) {
            await this.router.navigate(['/Admin-Dashboard']);
          } else {

            await this.router.navigate(['/User-Dashboard']);
          }
        }
      },
      (error) => {
        alert(error.error);
      }
    );
  }
}
