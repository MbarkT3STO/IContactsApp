import { Component, OnInit }       from '@angular/core';
import { ActivatedRoute }          from '@angular/router';
import { Contact }                 from 'src/app/DTOs/Contact/Contact';
import { UpdateContactRequest }    from 'src/app/DTOs/Contact/UpdateContactRequest';
import { ViewContactResponseDTO }  from 'src/app/DTOs/Contact/ViewContactResponseDTO';
import { ContactService }          from 'src/app/Services/Contact/Contact.service';
import { StringUtilService }       from 'src/app/Services/Helpers/Extensions/String/StringUtil.service';
import { IdentityService }         from 'src/app/Services/Identity/Identity.service';
import { map }                     from 'rxjs';
import { GetGroupsQueryResultDTO } from 'src/app/DTOs/Group/GetGroupsQueryResultDTO';
import { GroupService }            from 'src/app/Services/Group/Group.service';
import Swal                        from 'sweetalert2';

@Component({
  selector   : 'app-edit-Contact',
  templateUrl: './edit-Contact.component.html',
  styleUrls  : ['./edit-Contact.component.css'],
})
export class EditContactComponent implements OnInit {
  id                   : number                    = 0;
  contact              : ViewContactResponseDTO    = new ViewContactResponseDTO();
  updateContactRequest: UpdateContactRequest       = new UpdateContactRequest();
  groups               : GetGroupsQueryResultDTO[] = [];
  selectedFile         : File | null               = null;
  files                : File[]                    = [];

  constructor(
    private contactService : ContactService,
    private groupService   : GroupService,
    private route          : ActivatedRoute,
    private stringUtil     : StringUtilService,
    private identityService: IdentityService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.contactService.Get(this.id).subscribe((data) => {
      this.contact = data;

      // map ViewContactResponseDTO to UpdateContactRequest
      this.updateContactRequest.id          = this.contact.id;
      this.updateContactRequest.newName     = this.contact.name;
      this.updateContactRequest.newEmail    = this.contact.email;
      this.updateContactRequest.newPhone    = this.contact.phone;
      this.updateContactRequest.newAddress  = this.contact.address;
      this.updateContactRequest.newCountry  = this.contact.country;
      this.updateContactRequest.newCity     = this.contact.city;
      this.updateContactRequest.newState    = this.contact.state;
      this.updateContactRequest.newCompany  = this.contact.company;
      this.updateContactRequest.newJobTitle = this.contact.jobTitle;
      this.updateContactRequest.newNotes    = this.contact.notes;
      this.updateContactRequest.newGroupId  = this.contact.groupId;
      this.updateContactRequest.userId      = this.contact.userId;
    });

    this.groupService.GetGroups().subscribe((data) => (this.groups = data));
  }

  onSelectFile(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      this.selectedFile = files[0] as File;

      this.contact.imageFile = this.selectedFile;
    }
  }

  /**
   * Get the background image url for the contact profile
   * @returns the background image url
   **/
  getBackgroundImageUrl(): string {
    if (this.contact.imageUrl) {
      return `url(https://localhost:7004/${this.contact.imageUrl.replace(
        /\\/g,
        '/'
      )})`;
    }
    return 'url(https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png)';
  }

  validateUpdateContactRequest(): { isValid: boolean; message: string } {
    if (this.stringUtil.IsNullOrEmpty(this.updateContactRequest.newName))
      return { isValid: false, message: 'Name is required' };

    if (this.stringUtil.IsNullOrEmpty(this.updateContactRequest.newPhone))
      return { isValid: false, message: 'Phone is required' };

    if(this.stringUtil.IsValidPhoneNumber(this.updateContactRequest.newPhone) == false)
      return { isValid: false, message: 'Phone is not valid' };

    return { isValid: true, message: '' };
  }

  updateContact() {
    let validationResult = this.validateUpdateContactRequest();

    if (validationResult.isValid == false) {
      Swal.fire('Error', validationResult.message, 'error');
      return;
    }

    var formData = new FormData();

    formData.append('id', this.updateContactRequest.id.toString());
    formData.append('newName', this.updateContactRequest.newName);
    formData.append('newEmail', this.updateContactRequest.newEmail);
    formData.append('newPhone', this.updateContactRequest.newPhone);
    formData.append('newAddress', this.updateContactRequest.newAddress);
    formData.append('newCountry', this.updateContactRequest.newCountry);
    formData.append('newCity', this.updateContactRequest.newCity);
    formData.append('newState', this.updateContactRequest.newState);
    formData.append('newCompany', this.updateContactRequest.newCompany);
    formData.append('newJobTitle', this.updateContactRequest.newJobTitle);
    formData.append('newNotes', this.updateContactRequest.newNotes);
    formData.append('newGroupId', this.updateContactRequest.newGroupId.toString());
    formData.append('userId', this.updateContactRequest.userId.toString());
    formData.append('imageFile', this.selectedFile as Blob);

    this.contactService.UpdateFromForm(formData).subscribe(
      data => {
        Swal.fire('Success', 'Contact updated successfully', 'success');

        // Refresh the page
        window.location.reload();
      },
      error => Swal.fire('Error', error.error, 'error'));

  }
}
