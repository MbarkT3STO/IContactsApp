export class UpdateEmailRequest {
  public userName: string;
  public newEmail: string;
  public password: string;


  constructor(userName: string = "", newEmail: string = "", password: string = "") {
    this.userName = userName;
    this.newEmail = newEmail;
    this.password = password;
  }
}
