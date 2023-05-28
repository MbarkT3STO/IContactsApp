import { Component, OnInit } from '@angular/core';
import { CreateContactRequestDTO } from 'src/app/DTOs/Contact/CreateContactRequestDTO';
import { GroupService } from '../../Services/Group/Group.service';
import { GetGroupsQueryResultDTO } from '../../DTOs/Group/GetGroupsQueryResultDTO';
import { AuthService } from 'src/app/Services/Auth/Auth.service';
import { ContactService } from 'src/app/Services/Contact/Contact.service';
import { StringUtilService } from 'src/app/Services/Helpers/Extensions/String/StringUtil.service';
// import Swal from 'sweetalert2';
import Swal from 'sweetalert2';
// import '../../../assets/plugins/global/plugins.bundle.js';

@Component({
  selector: 'app-create-Contact',
  templateUrl: './create-Contact.component.html',
  styleUrls: [
    './create-Contact.component.css',
    '../../../assets/plugins/global/plugins.bundle.css',
  ],
})
export class CreateContactComponent implements OnInit {
  groups: GetGroupsQueryResultDTO[] = [];
  contact: CreateContactRequestDTO = new CreateContactRequestDTO();
  selectedFile: File | null = null;
  files: File[] = [];
  url: any;

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

  onSelectFile(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      this.selectedFile = files[0] as File;

      this.contact.imageFile = this.selectedFile;
    }
  }

  createContact() {
    // Swal.fire('Good job!', 'You clicked the button!', 'success');

    var contactValidationResult = this.validateContact();
    if (!contactValidationResult.isValid) {
      Swal.fire('Error!', contactValidationResult.message, 'error');
      return;
    }

    var formData = new FormData();

    var command = {
      name: this.contact.name,
      email: this.contact.email,
      phone: this.contact.phone,
      address: this.contact.address,
      country: this.contact.country,
      city: this.contact.city,
      state: this.contact.state,
      company: this.contact.company,
      jobTitle: this.contact.jobTitle,
      imageUrl: this.contact.imageUrl,
      imageFile: this.contact.imageFile,
      notes: this.contact.notes,
      groupId: this.contact.groupId,
      userId: this.contact.userId,
    };

    Object.entries(command).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    formData.append('imageFile', this.selectedFile as Blob);

    this.contactService.CreateFromForm(formData).subscribe(
      (result) => {
        Swal.fire('Success!', 'Contact created successfully!', 'success');

        this.resetContact();
      },
      (error) => {
        Swal.fire('Error!', error.error.message, 'error');
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

  resetContact() {
    this.contact = new CreateContactRequestDTO();
    this.contact.userId = this.authService.GetUserId();

    this.selectedFile = null;
  }
}
