import { Component, OnInit } from '@angular/core';
import { GroupService } from '../Services/Group/Group.service';
import { GetGroupsQueryResultDTO } from '../DTOs/Group/GetGroupsQueryResultDTO';
import { AuthService } from '../Services/Auth/Auth.service';

@Component({
  selector: 'app-User-Dashboard',
  templateUrl: './User-Dashboard.component.html',
  styleUrls: ['./User-Dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  public groups: GetGroupsQueryResultDTO[] = [];

  constructor(private groupService: GroupService, private auth: AuthService) {}

  ngOnInit() {
    this.auth.CheckUser();

    this.groupService.GetGroups().subscribe((result) => {
      this.groups = result;
      alert(this.groups.length);
    });
  }
}
