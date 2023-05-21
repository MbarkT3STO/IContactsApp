import { Component, OnInit } from '@angular/core';
import { CreateContactRequestDTO } from 'src/app/DTOs/Contact/CreateContactRequestDTO';
import { GroupService } from '../../Services/Group/Group.service';
import { GetGroupsQueryResultDTO } from '../../DTOs/Group/GetGroupsQueryResultDTO';
import { AuthService } from 'src/app/Services/Auth/Auth.service';
import { ContactService } from 'src/app/Services/Contact/Contact.service';
import { StringUtilService } from 'src/app/Services/Helpers/Extensions/String/StringUtil.service';

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
    private groupService: GroupService,
    private contactService: ContactService,
    private stringUtil: StringUtilService
  ) {}

  ngOnInit() {
    this.groupService.GetGroups().subscribe((data) => {
      this.groups = data;
    });

    this.contact.userId = this.authService.GetUserId();
  }

  createContact() {
    // alert(
    //   'Name: ' +
    //     this.contact.name +
    //     '\n' +
    //     'Email: ' +
    //     this.contact.email +
    //     '\n' +
    //     'Phone: ' +
    //     this.contact.phone +
    //     '\n' +
    //     'Address: ' +
    //     this.contact.address +
    //     '\n' +
    //     'Country: ' +
    //     this.contact.country +
    //     '\n' +
    //     'City: ' +
    //     this.contact.city +
    //     '\n' +
    //     'State: ' +
    //     this.contact.state +
    //     '\n' +
    //     'Company: ' +
    //     this.contact.company +
    //     '\n' +
    //     'Job Title: ' +
    //     this.contact.jobTitle +
    //     '\n' +
    //     'Image Url: ' +
    //     this.contact.imageUrl +
    //     '\n' +
    //     'Notes: ' +
    //     this.contact.notes +
    //     '\n' +
    //     'Group Id: ' +
    //     this.contact.groupId +
    //     '\n' +
    //     'User Id: ' +
    //     this.contact.userId +
    //     '\n'
    // );

    var contactValidationResult = this.validateContact();
    if (!contactValidationResult.isValid) {
      alert(contactValidationResult.message);
      return;
    }

    this.contactService.Create(this.contact).subscribe(
      (result) => {
        alert(
          'Contact created successfully with id: ' +
            result.id +
            ' and group id: ' +
            result.groupId
        );
        this.contact = new CreateContactRequestDTO();
      },
      (error) => {
        alert(error.message);
      }
    );
  }

  validateContact(): { isValid: boolean; message: string } {
    if (
      this.stringUtil.IsNullOrEmpty(this.contact.name) &&
      this.stringUtil.IsNullOrEmpty(this.contact.phone)
    ) {
      return { isValid: false, message: 'Name and Phone are required' };
    } else if (this.stringUtil.IsNotValidPhoneNumber(this.contact.phone)) {
      return { isValid: false, message: 'Phone is not valid' };
    }

    return { isValid: true, message: '' };
  }
}
