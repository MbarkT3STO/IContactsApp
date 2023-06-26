import { Component, OnInit } from '@angular/core';
import { AppUser } from 'src/app/Models/Identity/AppUser';
import { AuthService } from 'src/app/Services/Auth/Auth.service';
import { IdentityService } from 'src/app/Services/Identity/Identity.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-user-Header',
  templateUrl: './user-Header.component.html',
  styleUrls: ['./user-Header.component.css']
})
export class UserHeaderComponent implements OnInit {

  public user: AppUser = new AppUser();

  constructor(private authService:AuthService, private identityService:IdentityService) { }

  ngOnInit() {

    this.identityService.GetUserByUserName().subscribe((user)=>{
      this.user = user;
    });


  }

  logout() {

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {

        this.authService.Logout();
      }
    });
  }

}
