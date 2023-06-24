export class UpdatePasswordRequest {
  public userName: string;
  public currentPassword: string;
  public newPassword: string;
  public confirmNewPassword: string;

  constructor(userName: string = '', currentPassword: string = '', newPassword: string = '', confirmNewPassword: string = '') {
    this.userName = userName;
    this.currentPassword = currentPassword;
    this.newPassword = newPassword;
    this.confirmNewPassword = confirmNewPassword;
  }
}
