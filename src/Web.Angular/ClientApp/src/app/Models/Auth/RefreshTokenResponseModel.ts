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

  SetToLocalStorage() {
    localStorage.setItem('token', this.token);
    localStorage.setItem('createdAt', this.createdAt);
    localStorage.setItem('expiresAt', this.expiresAt);
    localStorage.setItem('refreshToken', this.refreshToken);

    alert(`token: ${this?.token} \n createdAt: ${this?.createdAt} \n expiresAt: ${this?.expiresAt} \n refreshToken: ${this?.refreshToken}`);
  }
}
