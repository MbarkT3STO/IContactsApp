import { Component, OnInit }     from '@angular/core';
import { UpdateEmailRequest }    from 'src/app/DTOs/Identity/UpdateEmailRequest';
import { AppUser }               from 'src/app/Models/Identity/AppUser';
import { StringUtilService }     from 'src/app/Services/Helpers/Extensions/String/StringUtil.service';
import { IdentityService }       from 'src/app/Services/Identity/Identity.service';
import Swal                      from 'sweetalert2';
import { UpdatePasswordRequest } from '../../DTOs/Identity/UpdatePasswordRequest';
import { AuthService }           from 'src/app/Services/Auth/Auth.service';

@Component({
  selector   : 'app-User-Settings',
  templateUrl: './User-Settings.component.html',
  styleUrls  : ['./User-Settings.component.css'],
})
export class UserSettingsComponent implements OnInit {
  constructor(
    private identityService: IdentityService,
    private authService    : AuthService,
    private stringUtil     : StringUtilService
  ) {}

  public user: AppUser                                = new AppUser();
  public userToEdit: AppUser                          = new AppUser();
  public updateEmailRequest: UpdateEmailRequest       = new UpdateEmailRequest();
  public updatePasswordRequest: UpdatePasswordRequest = new UpdatePasswordRequest();

  ngOnInit() {
    this.identityService.GetUserByUserName().subscribe((user) => {
      this.user       = user;
      this.userToEdit = user;

      this.updateEmailRequest.userName    = user.userName;
      this.updatePasswordRequest.userName = user.userName;
    });
  }

  updateEmail() {
    if (
      this.stringUtil.IsNullOrEmpty(this.updateEmailRequest.newEmail) ||
      this.stringUtil.IsNullOrEmpty(this.updateEmailRequest.password)
    ) {
      Swal.fire({
        title            : 'Error!',
        text             : 'The new email and password fields are required!',
        icon             : 'error',
        confirmButtonText: 'Ok',
      });
    } else {
      this.identityService.UpdateEmail(this.updateEmailRequest).subscribe(
        (response) => {
          if (response.isSucceeded) {
            Swal.fire({
              title            : 'Success!',
              text             : 'Email updated successfully!',
              icon             : 'success',
              confirmButtonText: 'Ok',
            });
          }
        },
        (error) => {
          Swal.fire({
            title            : 'Error!',
            text             : error.error.errorMessage,
            icon             : 'error',
            confirmButtonText: 'Ok',
          });
        }
      );
    }
  }

  updatePassword() {
    if (this.stringUtil.IsNullOrEmpty(this.updatePasswordRequest.newPassword) || this.stringUtil.IsNullOrEmpty(this.updatePasswordRequest.currentPassword) || this.stringUtil.IsNullOrEmpty(this.updatePasswordRequest.confirmNewPassword)) {
      Swal.fire({
        title            : 'Error!',
        text             : 'The current password, new password and confirm new password fields are required!',
        icon             : 'error',
        confirmButtonText: 'Ok',
      });
    } else if (this.updatePasswordRequest.newPassword !== this.updatePasswordRequest.confirmNewPassword) {
      Swal.fire({
        title            : 'Error!',
        text             : 'The new password and confirm new password fields must match!',
        icon             : 'error',
        confirmButtonText: 'Ok',
      });
    }
    else {
      this.identityService.UpdatePassword(this.updatePasswordRequest).subscribe(
        (response) => {
          if (response.isSucceeded) {
            Swal.fire({
              title            : 'Success!',
              text             : 'Password updated successfully!',
              icon             : 'success',
              confirmButtonText: 'Ok',
            });

            this.authService.Logout();
          }
        },
        (error) => {
          Swal.fire({
            title            : 'Error!',
            text             : error.error.errorMessage,
            icon             : 'error',
            confirmButtonText: 'Ok',
          });
        }
      );
    }


  }
}
