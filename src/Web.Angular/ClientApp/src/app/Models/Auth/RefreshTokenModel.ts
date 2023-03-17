export class RefreshTokenModel {
  refreshToken: string;
  userId: string;

  constructor(refreshToken: string, userId: string) {
    this.refreshToken = refreshToken;
    this.userId = userId;
  }
}
