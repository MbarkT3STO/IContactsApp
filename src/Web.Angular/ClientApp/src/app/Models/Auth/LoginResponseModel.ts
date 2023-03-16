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
    refreshToken: string
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
}
