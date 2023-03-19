import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponseModel } from 'src/app/Models/Auth/LoginResponseModel';
import { LoginModel } from 'src/app/Models/Auth/loginModel';
import { RefreshTokenModel } from '../../Models/Auth/RefreshTokenModel';
import { RefreshTokenResponseModel } from 'src/app/Models/Auth/RefreshTokenResponseModel';
import { Router } from '@angular/router';
import { IdentityService } from '../Identity/Identity.service';

@Injectable()
export class AuthService {
  apiUrl = 'http://localhost:5272';

  constructor(
    private http: HttpClient,
    private router: Router,
    private identity: IdentityService
  ) {}

  Login(model: LoginModel) {
    return this.http.post<LoginResponseModel>(
      this.apiUrl + '/api/Auth/Login',
      model
    );
  }

  RefreshToken(model: RefreshTokenModel) {
    return this.http.post<RefreshTokenResponseModel>(
      this.apiUrl + '/api/Auth/RefreshToken',
      model
    );
  }

  IsLoggedIn() {
    return localStorage.getItem('token') != null;
  }

  CheckUser() {
    if (this.IsLoggedIn()) {
      const userId = localStorage.getItem('userId');

      this.identity.IsUserInRole(userId!, 'User').subscribe(
        (result) => {
          if (result == true) {
            this.router.navigate(['/User-Dashboard']);
          } else {
            this.router.navigate(['/Admin-Dashboard']);
          }
        },
        (error) => {
          this.router.navigate(['/Login']);
        }
      );
    } else {
      this.router.navigate(['/Login']);
    }
  }

  Logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('createdAt');
    localStorage.removeItem('expiresAt');
    localStorage.removeItem('refreshToken');

    this.router.navigate(['/Login']);
  }
}
