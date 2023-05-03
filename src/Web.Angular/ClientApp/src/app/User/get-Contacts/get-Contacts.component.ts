import { Component, OnInit } from '@angular/core';
import { CreateGroupRequestDTO } from 'src/app/DTOs/Group/CreateGroupRequestDTO';
import { GetGroupsQueryResultDTO } from 'src/app/DTOs/Group/GetGroupsQueryResultDTO';
import { GroupService } from 'src/app/Services/Group/Group.service';

@Component({
  selector: 'app-get-Contacts',
  templateUrl: './get-Contacts.component.html',
  styleUrls: ['./get-Contacts.component.css']
})
export class GetContactsComponent implements OnInit {

  public groups: GetGroupsQueryResultDTO[] = [];
  public createGroupRequest = new CreateGroupRequestDTO();

  constructor(private groupService: GroupService) {}

  async ngOnInit() {
    await this.setGroups();
  }

  async setGroups() {
    var result = await this.groupService.GetGroups().toPromise();
    this.groups = result!;
  }

  async createGroup() {
    await this.groupService.Create(this.createGroupRequest).toPromise();
    await this.setGroups();
  }

}
