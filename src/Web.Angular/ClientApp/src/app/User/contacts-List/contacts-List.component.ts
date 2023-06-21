import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact }           from 'src/app/DTOs/Contact/Contact';
import { ContactService }    from 'src/app/Services/Contact/Contact.service';
import { StringUtilService } from 'src/app/Services/Helpers/Extensions/String/StringUtil.service';

@Component({
  selector   : 'app-contacts-List',
  templateUrl: './contacts-List.component.html',
  styleUrls  : ['./contacts-List.component.css'],
})
export class ContactsListComponent implements OnInit {
  originalContacts : Contact[] = [];
  displayedContacts: Contact[] = [];
  searchQuery      : string    = '';

  constructor(
    private contactService: ContactService,
    private stringUtil: StringUtilService,
    private router: Router
  ) {}

  ngOnInit() {
    this.contactService.GetAll().subscribe((data) => {
      this.originalContacts  = data;
      this.displayedContacts = data;
    });
  }

  search() {
    if (this.stringUtil.IsNullOrEmpty(this.searchQuery)) {
      this.displayedContacts = this.originalContacts;
    } else {
      this.displayedContacts = this.originalContacts.filter(
        (contact) =>
          contact.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          contact.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          contact.phone.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }
}
