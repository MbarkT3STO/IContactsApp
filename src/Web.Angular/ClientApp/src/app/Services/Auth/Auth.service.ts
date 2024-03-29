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
    private cookieService: CookieService
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
    const token = localStorage.getItem('token');

    if (token == null || token == '') return false;
    else return true;
  }

  async RedirectToDashboard() {
    const userId = localStorage.getItem('userId');

    var isUserInAdminRule = await this.identity
      .IsUserInRole(userId!, 'admin')
      .toPromise();

    if (isUserInAdminRule) {
      await this.router.navigate(['/Admin-Dashboard']);
    } else {
      await this.router.navigate(['/User-Dashboard']);
    }
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

      if (refreshTokenResponse && refreshTokenResponse.isSucceeded) {
        refreshTokenResponse.SetToCookie(); // <<<<<<<<<<<<<<<<<<<<<<<<<<<< Issue here, looks like this method is not called

        this.cookieService.set('token', refreshTokenResponse.token);
        this.cookieService.set('createdAt', refreshTokenResponse.createdAt);
        this.cookieService.set('expiresAt', refreshTokenResponse.expiresAt);
        this.cookieService.set(
          'refreshToken',
          refreshTokenResponse.refreshToken
        );

        const userId = this.cookieService.get('userId');

        var isUserInAdminRule = await this.identity
          .IsUserInRole(userId!, 'admin')
          .toPromise();

        if (isUserInAdminRule) {
          await this.router.navigateByUrl('/Admin-Dashboard');
        } else {
          await this.router.navigateByUrl('/User-Dashboard');
        }
      } else {
        this.ResetCookiesAuthData();
        await this.router.navigate(['/Login']);
      }
    } else {
      this.ResetCookiesAuthData();
      await this.router.navigate(['/Login']);
    }
  }

  Logout() {
    this.ResetLocalStorageAuthData();

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

  /** Refresh the token if it is expired */
  refreshToken(): Observable<RefreshTokenResponseModel> {
    const refreshToken = localStorage.getItem('refreshToken');
    var userId = localStorage.getItem('userId');

    if (refreshToken == null || userId == null) {
      return new Observable<RefreshTokenResponseModel>((observer) => {
        observer.next(
          new RefreshTokenResponseModel(
            false,
            '',
            '',
            '',
            '',
            '',
            this.cookieService
          )
        );
        observer.complete();
      });
    }

    var request = new RefreshTokenModel(refreshToken!, userId!);

    // send a POST request to the server to refresh the token
    return this.http
      .post<RefreshTokenResponseModel>(
        this.apiUrl + '/api/Auth/RefreshToken',
        request
      )
      .pipe(
        tap((response: RefreshTokenResponseModel) => {
          if (response.isSucceeded) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('createdAt', response.createdAt);
            localStorage.setItem('expiresAt', response.expiresAt);
            localStorage.setItem('refreshToken', response.refreshToken);
          } else {
            this.ResetLocalStorageAuthData();
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

  GetUserId(): string {
    var userId = localStorage.getItem('userId');

    if (userId == null) return '';
    else return userId;
  }
}
