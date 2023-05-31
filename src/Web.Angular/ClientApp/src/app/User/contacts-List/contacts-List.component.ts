import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/DTOs/Contact/Contact';
import { ContactService } from 'src/app/Services/Contact/Contact.service';

@Component({
  selector: 'app-contacts-List',
  templateUrl: './contacts-List.component.html',
  styleUrls: ['./contacts-List.component.css']
})
export class ContactsListComponent implements OnInit {

  contacts: Contact[] = [];

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contactService.GetAll().subscribe((data) => {
      this.contacts = data;
    });
  }

}
