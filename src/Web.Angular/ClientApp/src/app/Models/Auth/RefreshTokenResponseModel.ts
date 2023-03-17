export class RefreshTokenResponseModel {
  isSucceeded: boolean = false;
  message: string = '';
  token: string = '';
  createdAt: string = '';
  expiresAt: string = '';
  refreshToken: string = '';

  constructor(
    isSucceeded: boolean,
    message: string,
    token: string,
    createdAt: string,
    expiresAt: string,
    refreshToken: string
  ) {
    this.isSucceeded = isSucceeded;
    this.message = message;
    this.token = token;
    this.createdAt = createdAt;
    this.expiresAt = expiresAt;
    this.refreshToken = refreshToken;
  }
}
