import { Component, OnInit } from '@angular/core';
import { CreateContactRequestDTO } from 'src/app/DTOs/Contact/CreateContactRequestDTO';
import { GroupService } from '../../Services/Group/Group.service';
import { GetGroupsQueryResultDTO } from '../../DTOs/Group/GetGroupsQueryResultDTO';
import { AuthService } from 'src/app/Services/Auth/Auth.service';

@Component({
  selector: 'app-create-Contact',
  templateUrl: './create-Contact.component.html',
  styleUrls: ['./create-Contact.component.css'],
})
export class CreateContactComponent implements OnInit {
  groups: GetGroupsQueryResultDTO[] = [];
  contact: CreateContactRequestDTO = new CreateContactRequestDTO();

  constructor(
    private authService: AuthService,
    private groupService: GroupService
  ) {}

  ngOnInit() {
    this.groupService.GetGroups().subscribe((data) => {
      this.groups = data;
    });

    this.contact.userId = this.authService.GetUserId();
  }

  createContact() {
    alert(
      'Name: ' +
        this.contact.name +
        '\n' +
        'Email: ' +
        this.contact.email +
        '\n' +
        'Phone: ' +
        this.contact.phone +
        '\n' +
        'Address: ' +
        this.contact.address +
        '\n' +
        'Country: ' +
        this.contact.country +
        '\n' +
        'City: ' +
        this.contact.city +
        '\n' +
        'State: ' +
        this.contact.state +
        '\n' +
        'Company: ' +
        this.contact.company +
        '\n' +
        'Job Title: ' +
        this.contact.jobTitle +
        '\n' +
        'Image Url: ' +
        this.contact.imageUrl +
        '\n' +
        'Notes: ' +
        this.contact.notes +
        '\n' +
        'Group Id: ' +
        this.contact.groupId +
        '\n' +
        'User Id: ' +
        this.contact.userId +
        '\n'
    );
  }
}
