import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../../Services/Group/Group.service';
import { GetGroupsQueryResultDTO } from '../../../DTOs/Group/GetGroupsQueryResultDTO';

@Component({
  selector: 'app-get-Groups',
  templateUrl: './get-Groups.component.html',
  styleUrls: ['./get-Groups.component.css'],
})
export class GetGroupsComponent implements OnInit {
  groups: GetGroupsQueryResultDTO[] = [];

  constructor(private groupService: GroupService) {}

  async ngOnInit() {
    await this.setGroups();
  }

  async setGroups() {
    var result = await this.groupService.GetGroups().toPromise();
    this.groups = result!;
  }
}
