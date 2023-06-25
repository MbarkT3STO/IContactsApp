import { Component, OnInit }     from '@angular/core';
import { UpdateEmailRequest }    from 'src/app/DTOs/Identity/UpdateEmailRequest';
import { AppUser }               from 'src/app/Models/Identity/AppUser';
import { StringUtilService }     from 'src/app/Services/Helpers/Extensions/String/StringUtil.service';
import { IdentityService }       from 'src/app/Services/Identity/Identity.service';
import Swal                      from 'sweetalert2';
import { UpdatePasswordRequest } from '../../DTOs/Identity/UpdatePasswordRequest';
import { AuthService }           from 'src/app/Services/Auth/Auth.service';
import { UpdateUserRequest }     from 'src/app/DTOs/Identity/UpdateUserRequest';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-User-Settings',
  templateUrl: './User-Settings.component.html',
  styleUrls: ['./User-Settings.component.css'],
})
export class UserSettingsComponent implements OnInit {
  constructor(
    private identityService: IdentityService,
    private authService: AuthService,
    private stringUtil: StringUtilService,
    private sanitizer: DomSanitizer
  ) {}

  public user: AppUser = new AppUser();
  public userToEdit: AppUser = new AppUser();
  public updateEmailRequest: UpdateEmailRequest = new UpdateEmailRequest();
  public updatePasswordRequest: UpdatePasswordRequest =
    new UpdatePasswordRequest();
  public updateUserRequest: UpdateUserRequest = new UpdateUserRequest();

  // For update image
  selectedFile: File | null = null;
  files: File[] = [];
  url: any;

  ngOnInit() {
    this.identityService.GetUserByUserName().subscribe((user) => {
      this.user = user;
      this.userToEdit = user;

      this.updateEmailRequest.userName = user.userName;
      this.updatePasswordRequest.userName = user.userName;

      this.updateUserRequest.userName = user.userName;
      this.updateUserRequest.newFirstName = user.firstName;
      this.updateUserRequest.newLastName = user.lastName;
      this.updateUserRequest.newPhoneNumber = user.phoneNumber;
    });
  }

  updateEmail() {
    if (
      this.stringUtil.IsNullOrEmpty(this.updateEmailRequest.newEmail) ||
      this.stringUtil.IsNullOrEmpty(this.updateEmailRequest.password)
    ) {
      Swal.fire({
        title: 'Error!',
        text: 'The new email and password fields are required!',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    } else {
      this.identityService.UpdateEmail(this.updateEmailRequest).subscribe(
        (response) => {
          if (response.isSucceeded) {
            Swal.fire({
              title: 'Success!',
              text: 'Email updated successfully!',
              icon: 'success',
              confirmButtonText: 'Ok',
            });
          }
        },
        (error) => {
          Swal.fire({
            title: 'Error!',
            text: error.error.errorMessage,
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        }
      );
    }
  }

  updatePassword() {
    if (
      this.stringUtil.IsNullOrEmpty(this.updatePasswordRequest.newPassword) ||
      this.stringUtil.IsNullOrEmpty(
        this.updatePasswordRequest.currentPassword
      ) ||
      this.stringUtil.IsNullOrEmpty(
        this.updatePasswordRequest.confirmNewPassword
      )
    ) {
      Swal.fire({
        title: 'Error!',
        text: 'The current password, new password and confirm new password fields are required!',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    } else if (
      this.updatePasswordRequest.newPassword !==
      this.updatePasswordRequest.confirmNewPassword
    ) {
      Swal.fire({
        title: 'Error!',
        text: 'The new password and confirm new password fields must match!',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    } else {
      this.identityService.UpdatePassword(this.updatePasswordRequest).subscribe(
        (response) => {
          if (response.isSucceeded) {
            Swal.fire({
              title: 'Success!',
              text: 'Password updated successfully!',
              icon: 'success',
              confirmButtonText: 'Ok',
            });

            this.authService.Logout();
          }
        },
        (error) => {
          Swal.fire({
            title: 'Error!',
            text: error.error.errorMessage,
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        }
      );
    }
  }

  onSelectFile(event: any) {
    const files = event.target.files;

    if (files.length > 0) {
      this.selectedFile = files[0];

      this.updateUserRequest.newImageFile = this.selectedFile;
    }
  }

  setRemoveImage() {
    this.updateUserRequest.removeImage = true;
    this.updateUserRequest.newImageFile = null;
    this.selectedFile = null;
  }

  updateUserInfo() {
    if (
      this.stringUtil.IsNullOrEmpty(this.updateUserRequest.newFirstName) ||
      this.stringUtil.IsNullOrEmpty(this.updateUserRequest.newLastName)
    ) {
      Swal.fire({
        title: 'Error!',
        text: 'The first name and last name fields are required!',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
    // else if (this.updateUserRequest.newFirstName === this.user.firstName) {
    //   Swal.fire({ title: 'Error!', text: 'The first name must be different from the current one!', icon: 'error', confirmButtonText: 'Ok' });
    // }
    // else if (this.updateUserRequest.newLastName === this.user.lastName) {
    //   Swal.fire({ title: 'Error!', text: 'The last name must be different from the current one!', icon: 'error', confirmButtonText: 'Ok' });
    // }
    else if (
      this.stringUtil.IsNotNullOrEmpty(this.updateUserRequest.newPhoneNumber) &&
      this.stringUtil.IsValidPhoneNumber(
        this.updateUserRequest.newPhoneNumber
      ) === false
    ) {
      Swal.fire({
        title: 'Error!',
        text: 'The phone number is not valid!',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    } else {
      var formData = new FormData();

      formData.append('userName', this.updateUserRequest.userName);
      formData.append('newFirstName', this.updateUserRequest.newFirstName);
      formData.append('newLastName', this.updateUserRequest.newLastName);
      formData.append('newPhoneNumber', this.updateUserRequest.newPhoneNumber);
      formData.append('newImageFile', this.selectedFile as Blob);
      formData.append(
        'removeImage',
        this.updateUserRequest.removeImage.toString()
      );

      this.identityService.UpdateUserFromForm(formData).subscribe(
        (response) => {
          if (response.isSucceeded) {
            Swal.fire({
              title: 'Success!',
              text: 'User info updated successfully!',
              icon: 'success',
              confirmButtonText: 'Ok',
            });

            // Refresh the page
            window.location.reload();
          }
        },
        (error) => {
          Swal.fire({
            title: 'Error!',
            text: error.error.errorMessage,
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        }
      );
    }
  }

  /**
   * Get the background image url for the user profile
   * @returns the background image url
   **/
  getBackgroundImageUrl(): string {
    if (this.user.imageUrl) {
      return `url(https://localhost:7004/${this.user.imageUrl.replace(
        /\\/g,
        '/'
      )})`;
    }
    return 'url(https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png)';
  }
}
