import { Component, OnInit } from '@angular/core';
import { GetGroupsQueryResultDTO } from 'src/app/DTOs/Group/GetGroupsQueryResultDTO';
import { GroupService } from 'src/app/Services/Group/Group.service';

@Component({
  selector: 'app-get-Contacts',
  templateUrl: './get-Contacts.component.html',
  styleUrls: ['./get-Contacts.component.css']
})
export class GetContactsComponent implements OnInit {

  public groups: GetGroupsQueryResultDTO[] = [];

  constructor(private groupService: GroupService) {}

  async ngOnInit() {
    await this.setGroups();
  }

  async setGroups() {
    var result = await this.groupService.GetGroups().toPromise();
    this.groups = result!;
  }

}
