import { Component, OnInit } from '@angular/core';
import { AppUser }           from 'src/app/Models/Identity/AppUser';
import { IdentityService }   from 'src/app/Services/Identity/Identity.service';

@Component({
  selector   : 'app-user-Profile',
  templateUrl: './user-Profile.component.html',
  styleUrls  : ['./user-Profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private identityService: IdentityService) { }

  public user: AppUser       = new AppUser();

  ngOnInit() {

    this.identityService.GetUserByUserName().subscribe((user)=>{
      this.user = user;
    });
  }

}
