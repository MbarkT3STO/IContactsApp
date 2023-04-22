import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponseModel } from 'src/app/Models/Auth/LoginResponseModel';
import { LoginModel } from 'src/app/Models/Auth/loginModel';
import { RefreshTokenModel } from '../../Models/Auth/RefreshTokenModel';
import { RefreshTokenResponseModel } from 'src/app/Models/Auth/RefreshTokenResponseModel';
import { Router } from '@angular/router';
import { IdentityService } from '../Identity/Identity.service';
import { CookieService } from 'ngx-cookie-service';
import { Observable, tap } from 'rxjs';

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

  async RedirectToDashboard(){

    alert('From RedirectToDashboard');

    const userId = this.cookieService.get('userId');

    var isUserInAdminRule = await this.identity.IsUserInRole(userId!, 'admin').toPromise();

    if (isUserInAdminRule)
    {
      alert('/Admin-Dashboard')
      await this.router.navigate(['/Admin-Dashboard']);
    }
    else
    {
      alert('/User-Dashboard')
      await this.router.navigate(['/User-Dashboard']);
    }
  }

  async CheckUser() {
    const isLoggedIn = this.IsLoggedIn();
    var isTokenValid = await this.IsTokenFromCookiesValid();

    alert('From CheckUser');

    // print to console
    // alert('isLoggedIn: ' + isLoggedIn);
    // alert('isTokenValid: ' + isTokenValid);

    if (isLoggedIn && isTokenValid) {
      const userId = this.cookieService.get('userId');

      var isUserInAdminRule = await this.identity.IsUserInRole(userId!, 'admin').toPromise();

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

        this.cookieService.set('token', refreshTokenResponse.token);
        this.cookieService.set('createdAt', refreshTokenResponse.createdAt);
        this.cookieService.set('expiresAt', refreshTokenResponse.expiresAt);
        this.cookieService.set('refreshToken', refreshTokenResponse.refreshToken);


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
        await this.router.navigate(['/Login']);
      }
    }
    else
    {
      this.ResetCookiesAuthData();
     await this.router.navigate(['/Login']);
    }
  }

  Logout() {
    this.ResetCookiesAuthData();

    this.router.navigate(['/Login']);
  }

  isLoggedIn(): boolean {
    var isLoggedIn = this.cookieService.get('isLoggedIn');

    if (isLoggedIn == null || isLoggedIn == '' || isLoggedIn == 'false')
      return false;
    else return true;
  }


  isAuthenticated(): boolean {
    var token = this.cookieService.get('token');
    var expiresAt = this.cookieService.get('expiresAt');

    if (token == null || expiresAt == null) return false;
    else return true;
  }

  isTokenExpired(): boolean {
    var token = this.cookieService.get('token');
    var expiresAt = this.cookieService.get('expiresAt');

    if (token == null || expiresAt == null) return true;

    var expiresAtDate = new Date(expiresAt);
    var now = new Date();

    if (expiresAtDate < now) return true;
    else return false;
  }

  refreshToken(): Observable<RefreshTokenResponseModel> {
    const refreshToken = this.cookieService.get('refreshToken'); // get the refresh token cookies
    var userId = this.cookieService.get('userId');

    var request = new RefreshTokenModel(refreshToken, userId);

    // send a POST request to the server to refresh the token
    return this.http.post<RefreshTokenResponseModel>(this.apiUrl+'/api/Auth/RefreshToken', { request }).pipe(
      tap((response: any) => {
        if (response.success) {
          this.cookieService.set('token', response.token); // set the new token
          this.cookieService.set('createdAt', response.createdAt); // set the new token creation time
          this.cookieService.set('expiresAt', response.expiresAt); // set the new token expiration time
          this.cookieService.set('refreshToken', response.refreshToken); // set the new refresh token
        } else {
          // if the refresh token is invalid, remove it from cookies
          this.cookieService.delete('token');
          this.cookieService.delete('createdAt');
          this.cookieService.delete('expiresAt');
          this.cookieService.delete('refreshToken');
        }
      })
    );
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
