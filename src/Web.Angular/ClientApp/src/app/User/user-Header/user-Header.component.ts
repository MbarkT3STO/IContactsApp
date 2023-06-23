import { Component, OnInit } from '@angular/core';
import { AppUser } from 'src/app/Models/Identity/AppUser';
import { AuthService } from 'src/app/Services/Auth/Auth.service';
import { IdentityService } from 'src/app/Services/Identity/Identity.service';

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

}
