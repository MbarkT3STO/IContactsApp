import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponseModel } from 'src/app/Models/Auth/LoginResponseModel';
import { LoginModel } from 'src/app/Models/Auth/loginModel';
import { RefreshTokenModel } from '../../Models/Auth/RefreshTokenModel';
import { RefreshTokenResponseModel } from 'src/app/Models/Auth/RefreshTokenResponseModel';
import { Router } from '@angular/router';
import { IdentityService } from '../Identity/Identity.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthService {
  apiUrl = 'http://localhost:5272';

  constructor(
    private http: HttpClient,
    private router: Router,
    private identity: IdentityService,
    private cookieService:CookieService
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

  IsLoggedIn(): boolean {
    const token = this.cookieService.get('token');

    if (token == null || token == '') return false;
    else return true;
  }

  async CheckUser() {
    const isLoggedIn = this.IsLoggedIn();
    var isTokenValid = await this.IsTokenFromCookiesValid();

    // print to console
    // alert('isLoggedIn: ' + isLoggedIn);
    // alert('isTokenValid: ' + isTokenValid);

    if (isLoggedIn && isTokenValid) {
      const userId = this.cookieService.get('userId');

      var isUserInAdminRule = await this.identity
        .IsUserInRole(userId!, 'admin')
        .toPromise();

      if (isUserInAdminRule) {
        await this.router.navigateByUrl('/Admin-Dashboard');
      } else {
        await this.router.navigateByUrl('/User-Dashboard');
      }
    } else if (isLoggedIn && !isTokenValid) {
      var refreshToken = this.cookieService.get('refreshToken');
      var userId = this.cookieService.get('userId');

      var request = new RefreshTokenModel(refreshToken, userId);

      var refreshTokenResponse = await this.RefreshToken(request).toPromise();

      alert('IsSucceeded: ' +refreshTokenResponse?.isSucceeded +'\n new Token: ' +refreshTokenResponse?.token +'\n Expires at:' +refreshTokenResponse?.expiresAt); // <<<<<<<<<<<<<<<<<<<<<<<<<<<<

      if (refreshTokenResponse && refreshTokenResponse.isSucceeded)
      {
        alert('Refresh token succeeded'); // <<<<<<<<<<<<<<<<<<<<<<<<<<<<

        refreshTokenResponse.SetToCookie(); // <<<<<<<<<<<<<<<<<<<<<<<<<<<< Issue here, looks like this method is not called

        const userId = this.cookieService.get('userId');

        var isUserInAdminRule = await this.identity.IsUserInRole(userId!, 'admin').toPromise();

        if (isUserInAdminRule)
        {
          await this.router.navigateByUrl('/Admin-Dashboard');
        } else
        {
          await this.router.navigateByUrl('/User-Dashboard');
        }
      }
      else
      {
        alert('Refresh token failed'); // <<<<<<<<<<<<<<<<<<<<<<<<<<<<

        this.ResetCookiesAuthData();
        this.router.navigate(['/Login']);
      }
    }
    else
    {
      this.ResetCookiesAuthData();
      this.router.navigate(['/Login']);
    }
  }

  Logout() {
    this.ResetCookiesAuthData();

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

  async IsTokenFromLocalStorageValid() {
    var token = localStorage.getItem('token');
    var isValid: boolean = false;

    if (token == null) isValid = false;
    else
      isValid = (await this.http
        .post<boolean>(
          `${this.apiUrl}/api/Auth/IsTokenValid?token=${token}`,
          null
        )
        .toPromise()) as boolean;

    return isValid;
  }

  async IsTokenFromCookiesValid() {
    var token = this.cookieService.get('token');
    var isValid: boolean = false;

    if (token == null) isValid = false;
    else
      isValid = (await this.http
        .post<boolean>(
          `${this.apiUrl}/api/Auth/IsTokenValid?token=${token}`,
          null
        )
        .toPromise()) as boolean;

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

  ResetCookiesAuthData() {
    this.cookieService.delete('userId');
    this.cookieService.delete('username');
    this.cookieService.delete('token');
    this.cookieService.delete('createdAt');
    this.cookieService.delete('expiresAt');
    this.cookieService.delete('refreshToken');
  }
}
