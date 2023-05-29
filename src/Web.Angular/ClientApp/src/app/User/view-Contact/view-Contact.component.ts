import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { ViewContactResponseDTO } from 'src/app/DTOs/Contact/ViewContactResponseDTO';
import { ContactService } from 'src/app/Services/Contact/Contact.service';

@Component({
  selector   : 'app-view-Contact',
  templateUrl: './view-Contact.component.html',
  styleUrls  : ['./view-Contact.component.css']
})
export class ViewContactComponent implements OnInit {

  contactId: number = 0;
  public contact: ViewContactResponseDTO = new ViewContactResponseDTO();

  constructor(private contactService: ContactService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.contactId = params['id'];
    });

    this.contactService.Get(this.contactId).subscribe((response) =>
    {
      this.contact = response;
    });

  }

}
