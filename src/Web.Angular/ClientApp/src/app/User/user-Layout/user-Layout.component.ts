import { Component, OnInit } from '@angular/core';
import { AppUser } from 'src/app/Models/Identity/AppUser';
import { AuthService } from 'src/app/Services/Auth/Auth.service';
import { GroupService } from 'src/app/Services/Group/Group.service';
import { IdentityService } from 'src/app/Services/Identity/Identity.service';

@Component({
  selector: 'app-user-Layout',
  templateUrl: './user-Layout.component.html',
  styleUrls: ['./user-Layout.component.css']
})
export class UserLayoutComponent implements OnInit {

  public appUser: AppUser = new AppUser();

  constructor(
    private groupService: GroupService,
    private auth: AuthService,
    private identity: IdentityService
  ) {}

  ngOnInit() {
    this.setAppUser();
  }

  setAppUser() {
    this.identity.GetUserByUserName().subscribe((result) => {
      this.appUser = result;
    });
  }
}
