import { CookieService } from "ngx-cookie-service";

export class LoginResponseModel {
  isSucceeded: boolean = false;
  message: string = '';
  userId: string = '';
  username: string = '';
  token: string = '';
  createdAt: string = '';
  expiresAt: string = '';
  refreshToken: string = '';

  constructor(
    isSucceeded: boolean,
    message: string,
    userId: string,
    username: string,
    token: string,
    createdAt: string,
    expiresAt: string,
    refreshToken: string,
    private cookieService:CookieService
  ) {
    this.isSucceeded = isSucceeded;
    this.message = message;
    this.userId = userId;
    this.username = username;
    this.token = token;
    this.createdAt = createdAt;
    this.expiresAt = expiresAt;
    this.refreshToken = refreshToken;
  }

  setToCookies(){

    this.cookieService.set('userId', this.userId);
    this.cookieService.set('username', this.username);

    this.cookieService.set('token', this.token);
    this.cookieService.set('createdAt', this.createdAt);
    this.cookieService.set('expiresAt', this.expiresAt);
    this.cookieService.set('refreshToken', this.refreshToken);
  }
}
