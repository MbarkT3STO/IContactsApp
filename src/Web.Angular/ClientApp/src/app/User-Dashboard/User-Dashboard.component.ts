import { Component, OnInit } from '@angular/core';
import { GroupService } from '../Services/Group/Group.service';
import { GetGroupsQueryResultDTO } from '../DTOs/Group/GetGroupsQueryResultDTO';
import { AuthService } from '../Services/Auth/Auth.service';
import { AppUser } from '../Models/Identity/AppUser';
import { IdentityService } from '../Services/Identity/Identity.service';

@Component({
  selector: 'app-User-Dashboard',
  templateUrl: './User-Dashboard.component.html',
  styleUrls: ['./User-Dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  public groups: GetGroupsQueryResultDTO[] = [];
  public appUser: AppUser = new AppUser();

  constructor(
    private groupService: GroupService,
    private auth: AuthService,
    private identity: IdentityService
  ) {}

  ngOnInit() {
    this.auth.CheckUser();
    this.setAppUser();
  }

  setAppUser() {
    this.identity.GetUserByUserName().subscribe((result) => {
      this.appUser = result;
    });
  }
}
