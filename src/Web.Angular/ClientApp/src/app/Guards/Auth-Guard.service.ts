import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../Services/Auth/Auth.service';
import { RefreshTokenModel } from '../Models/Auth/RefreshTokenModel';
import { IdentityService } from '../Services/Identity/Identity.service';
import { Observable, map } from 'rxjs';
import { async } from '@angular/core/testing';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private identity: IdentityService,
    private router: Router,
    private cookieService: CookieService,
    private jwtService: JwtHelperService
  ) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = localStorage.getItem('token');

    // alert('From GUARD 1');

    if (token && !this.jwtService.isTokenExpired(token)) {
      // alert('From GUARD : token is not expired');
      return true;
    }

    var refreshTokenRequest = await this.authService.refreshToken().toPromise();

    // alert('Is refresh token succeeded : ' + refreshTokenRequest?.isSucceeded);

    if (!refreshTokenRequest?.isSucceeded) {
      // alert('From GUARD : token is expired and refresh token is not succeeded');
      this.authService.ResetLocalStorageAuthData();
      this.router.navigate(['login']);
      return false;
    }

    // alert('From GUARD : token is expired and refresh token is succeeded');
    return refreshTokenRequest?.isSucceeded;
  }

  // async canActivate():Promise<boolean> {
  //   // Check if user is logged in and authenticated and token is not expired
  //   if (this.authService.isLoggedIn() && this.authService.isAuthenticated() && !this.authService.isTokenExpired())
  //   {
  //     alert('From GUARD 1');
  //     return true;
  //   }

  //   // If the token is expired, try to refresh it using the refresh token
  //   if (this.authService.isTokenExpired()) {
  //     this.authService.refreshToken().pipe(
  //       map(async (response: any) => {
  //         if (response.success) {
  //     alert('From GUARD 2');

  //           return true;
  //         } else {
  //           // If the refresh token is invalid, redirect to login page
  //     alert('From GUARD 3');

  //           await this.router.navigate(['/login']);
  //           return false;
  //         }
  //       })
  //     );
  //   }

  //   // If user is not authenticated, redirect to login page
  //   alert('From GUARD 4');

  //   await this.router.navigateByUrl('/login');
  //   return false;
  // }
}
