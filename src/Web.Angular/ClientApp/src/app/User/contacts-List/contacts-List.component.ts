import { Component, Input, OnChanges, OnInit }             from '@angular/core';
import { Router }                               from '@angular/router';
import { Contact }                              from 'src/app/DTOs/Contact/Contact';
import { GetContactsByGroupResponseContactDTO } from 'src/app/DTOs/Contact/GetContactsByGroupResponseContactDTO';
import { ContactService }                       from 'src/app/Services/Contact/Contact.service';
import { StringUtilService }                    from 'src/app/Services/Helpers/Extensions/String/StringUtil.service';
import Swal                                     from 'sweetalert2';

@Component({
  selector   : 'app-contacts-List',
  templateUrl: './contacts-List.component.html',
  styleUrls  : ['./contacts-List.component.css'],
})
export class ContactsListComponent implements OnInit, OnChanges {
  @Input           () contactsByGroup: GetContactsByGroupResponseContactDTO[] = [];
  @Input           () isFromViewGroupComponent: boolean                       = false;
  originalContacts : Contact[]                                                = [];
  displayedContacts: Contact[]                                                = [];
  searchQuery      : string                                                   = '';
  groupId          : string                                                   = '';

  constructor(
    private contactService: ContactService,
    private stringUtil    : StringUtilService,
    private router        : Router
  ) {}

  ngOnInit() {
    if (this.isFromViewGroupComponent) {
      this.originalContacts = this.contactsByGroup.map((contact) => ({
        id       : contact.id,
        name     : contact.name,
        email    : contact.email,
        phone    : contact.phone,
        address  : contact.address,
        country  : contact.country,
        city     : contact.city,
        state    : contact.state,
        imageFile: null,
        company  : contact.company,
        jobTitle : contact.jobTitle,
        imageUrl : contact.imageUrl,
        notes    : contact.notes,
        groupId  : contact.groupId,
        userId   : contact.userId,
      }));
      this.displayedContacts = this.originalContacts;

    } else {
      this.contactService.GetAll().subscribe(
        (data) => {
          this.originalContacts  = data;
          this.displayedContacts = data;
        },
        (error) => {
          Swal.fire('Error', 'An error has occurred' + error.message, 'error');
        }
      );
    }
  }

  ngOnChanges() {
    if (this.isFromViewGroupComponent) {
      this.originalContacts = this.contactsByGroup.map((contact) => ({
        id: contact.id,
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        address: contact.address,
        country: contact.country,
        city: contact.city,
        state: contact.state,
        imageFile: null,
        company: contact.company,
        jobTitle: contact.jobTitle,
        imageUrl: contact.imageUrl,
        notes: contact.notes,
        groupId: contact.groupId,
        userId: contact.userId,
      }));

      this.displayedContacts = this.originalContacts;
    }
  }


  search() {
    if (this.stringUtil.IsNullOrEmpty(this.searchQuery)) {
      this.displayedContacts = this.originalContacts;
    } else {
      this.displayedContacts = this.originalContacts.filter(
        (contact) =>
          contact.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          contact.email
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          contact.phone.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }
}
