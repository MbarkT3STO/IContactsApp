import { Component, Input, OnInit }             from '@angular/core';
import { GroupService }                         from 'src/app/Services/Group/Group.service';
import { GetContactsByGroupRequestDTO }         from '../../DTOs/Contact/GetContactsByGroupRequestDTO';
import { ActivatedRoute }                       from '@angular/router';
import { AuthService }                          from 'src/app/Services/Auth/Auth.service';
import Swal                                     from 'sweetalert2';
import { ContactService }                       from 'src/app/Services/Contact/Contact.service';
import { GetContactsByGroupResponseContactDTO } from 'src/app/DTOs/Contact/GetContactsByGroupResponseContactDTO';
import { GetContactsByGroupResponseDTO }        from 'src/app/DTOs/Contact/GetContactsByGroupResponseDTO';

@Component({
  selector   : 'app-view-Group',
  templateUrl: './view-Group.component.html',
  styleUrls  : ['./view-Group.component.css']
})
export class ViewGroupComponent implements OnInit {

  public contacts: GetContactsByGroupResponseContactDTO[] = [];
  public group: GetContactsByGroupResponseDTO             = new GetContactsByGroupResponseDTO();

  constructor(private groupService: GroupService, private contactService: ContactService, private route:ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {

    this.route.params.subscribe(params => {

      var groupId = params['id'];
      var userId  = this.authService.GetUserId();

      var request = new GetContactsByGroupRequestDTO(groupId, userId);

      this.contactService.GetContactsByGroup(request).subscribe(data => {
        this.group = data;
        this.contacts = data.contacts;
      }, error => {
        Swal.fire('Error', 'An error has occurred' + error.message, 'error');
      })
    });
  }

}
