export class AppUser {
  id: string = '';
  userName: string = '';
  normalizedUserName: string = '';
  email: string = '';
  normalizedEmail: string = '';
  emailConfirmed: boolean = false;
  concurrencyStamp: string = '';
  phoneNumber: string = '';
  phoneNumberConfirmed: boolean = false;
  twoFactorEnabled: boolean = false;
  lockoutEnd: Date = new Date();
  lockoutEnabled: boolean = false;
  accessFailedCount: number = 0;
  firstName: string = '';
  lastName: string = '';
  fullName: string = this.firstName + ' ' + this.lastName;
}
