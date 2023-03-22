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

    const isLoggedIn = this.IsLoggedIn();
    var isTokenValid = this.IsTokenFromLocalStorageValid();

    if ( isLoggedIn && isTokenValid) {
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
    } else if (isLoggedIn && !isTokenValid) {

      var refreshToken = localStorage.getItem('refreshToken')!;
      var userId = localStorage.getItem('userId')!;

      var request = new RefreshTokenModel(refreshToken, userId);

      this.RefreshToken(request).subscribe( (result) => {
        if (result.isSucceeded) {
          result.SetToLocalStorage();
          this.CheckUser();
        } else {
          this.ResetLocalStorageAuthData();
          this.router.navigate(['/Login']);
        }
      });
    } else {
      this.ResetLocalStorageAuthData();
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

  IsTokenValid(token: string) {
    var isValid: boolean = false;

    if (token == null) isValid = false;
    else
      this.http
        .post<boolean>(
          `${this.apiUrl}/api/Auth/IsTokenValid?token=${token}`,
          null
        )
        .subscribe((result) => {
          isValid = result;
        });

    return isValid;
  }

  IsTokenFromLocalStorageValid() {
    var token = localStorage.getItem('token');
    var isValid: boolean = false;

    if (token == null) isValid = false;
    else
      this.http
        .post<boolean>(
          `${this.apiUrl}/api/Auth/IsTokenValid?token=${token}`,
          null
        )
        .subscribe((result) => {
          isValid = result;
        });

    return isValid;
  }

  ResetLocalStorageAuthData() {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('createdAt');
    localStorage.removeItem('expiresAt');
    localStorage.removeItem('refreshToken');
  }
}
