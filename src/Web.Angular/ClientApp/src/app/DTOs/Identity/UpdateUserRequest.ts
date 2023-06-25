export class UpdateUserRequest {

  public userName: string;
  public newFirstName: string;
  public newLastName: string;
  public newPhoneNumber: string;
  public newImageFile: File | null = null;
  public removeImage: boolean = false;

  constructor(userName: string = "", newFirstName: string = "", newLastName: string = "", newPhoneNumber: string = "") {
    this.userName = userName;
    this.newFirstName = newFirstName;
    this.newLastName = newLastName;
    this.newPhoneNumber = newPhoneNumber;
  }
}
