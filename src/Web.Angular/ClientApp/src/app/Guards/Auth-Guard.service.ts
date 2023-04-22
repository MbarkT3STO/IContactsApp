import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../Services/Auth/Auth.service';
import { RefreshTokenModel } from '../Models/Auth/RefreshTokenModel';
import { IdentityService } from '../Services/Identity/Identity.service';
import { map } from 'rxjs';
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private identity: IdentityService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  async canActivate():Promise<boolean> {
    // Check if user is logged in and authenticated and token is not expired
    if (this.authService.isLoggedIn() && this.authService.isAuthenticated() && !this.authService.isTokenExpired())
    {
      alert('From GUARD 1');
      return true;
    }

    // If the token is expired, try to refresh it using the refresh token
    if (this.authService.isTokenExpired()) {
      this.authService.refreshToken().pipe(
        map(async (response: any) => {
          if (response.success) {
      alert('From GUARD 2');

            return true;
          } else {
            // If the refresh token is invalid, redirect to login page
      alert('From GUARD 3');

            await this.router.navigate(['/login']);
            return false;
          }
        })
      );
    }

    // If user is not authenticated, redirect to login page
    alert('From GUARD 4');

    await this.router.navigateByUrl('/login');
    return false;
  }
}
