import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute }         from '@angular/router';
import { DeleteContactRequest }   from 'src/app/DTOs/Contact/DeleteContactRequest';
import { ViewContactResponseDTO } from 'src/app/DTOs/Contact/ViewContactResponseDTO';
import { ContactService } from 'src/app/Services/Contact/Contact.service';
import Swal from 'sweetalert2';


@Component({
  selector   : 'app-view-Contact',
  templateUrl: './view-Contact.component.html',
  styleUrls  : ['./view-Contact.component.css'],
})
export class ViewContactComponent implements OnInit {
  contactId: number                                    = 0;
  public    contact: ViewContactResponseDTO            = new ViewContactResponseDTO();
  public    deleteContactRequest: DeleteContactRequest = new DeleteContactRequest();

  constructor(
    private contactService: ContactService,
    private route         : ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.contactId = params['id'];

      this.getData();
    });

    this.getData();
  }

  getData() {
    this.contactService.Get(this.contactId).subscribe((response) => {
      this.contact = response;
    });
  }

  deleteContact() {

    Swal.fire({ title: 'Are you sure?', text: 'You will not be able to recover this contact!', icon: 'warning', showCancelButton: true, confirmButtonText: 'Yes, delete it!', cancelButtonText: 'No, keep it' }).then((result) => {
      if (result.isConfirmed) {

        this.deleteContactRequest.userId = this.contact.userId;
        this.deleteContactRequest.id = this.contact.id;

        this.contactService.Delete(this.deleteContactRequest).subscribe((response) => {
          if (response.isDeleted) {
            Swal.fire({
              title: 'Deleted!',
              text: 'Your contact has been deleted.',
              icon: 'success',
              confirmButtonText: 'Ok',
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = '/User/Contact/Get-Contacts';
              }
            });
          } else {
            Swal.fire({
              title: 'Error!',
              text: 'Your contact has not been deleted.',
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          }
        });
      }
      else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your contact is safe :)', 'error');
      }
    });

  }
}
