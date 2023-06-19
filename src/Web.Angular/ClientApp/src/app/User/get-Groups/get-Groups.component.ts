import { Component, OnInit }       from '@angular/core';
import { GroupService }            from 'src/app/Services/Group/Group.service';
import { GetGroupsQueryResultDTO } from '../../DTOs/Group/GetGroupsQueryResultDTO';
import { CreateGroupRequestDTO }   from 'src/app/DTOs/Group/CreateGroupRequestDTO';
import Swal                        from 'sweetalert2';
import { StringUtilService }       from 'src/app/Services/Helpers/Extensions/String/StringUtil.service';
import { IdentityService } from 'src/app/Services/Identity/Identity.service';
import { AuthService } from 'src/app/Services/Auth/Auth.service';

@Component({
  selector   : 'app-get-Groups',
  templateUrl: './get-Groups.component.html',
  styleUrls  : ['./get-Groups.component.css'],
})
export class GetGroupsComponent implements OnInit {
  public groups: GetGroupsQueryResultDTO[] = [];
  public createGroupRequest                = new CreateGroupRequestDTO();

  constructor(
    private groupService: GroupService,
    private stringUtil: StringUtilService,
    private identity: IdentityService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.groupService
      .GetGroups()
      .subscribe((result) => (this.groups = result!));

    this.createGroupRequest.userId= this.auth.GetUserId();
  }

  createGroup() {
    var validationResult = this.validateGroup();
alert(this.createGroupRequest.name)
    if (validationResult.isValid) {
      this.groupService.Create(this.createGroupRequest).subscribe(
        (result) => {
          Swal.fire('Success!', 'Contact created successfully!', 'success');

          this.groups.push(result);
          this.createGroupRequest.name = '';
        },
        (error) => {
          Swal.fire('error', error.error.message, 'error');
          // alert(error.message);
        }
      );
    } else {
      Swal.fire('error', validationResult.message, 'error');
      // alert(validationResult.message);
    }
  }

  validateGroup(): { isValid: boolean; message: string } {
    if (this.stringUtil.IsNullOrEmpty(this.createGroupRequest.name)) {
      return { isValid: false, message: 'Group name is required!' };
    }

    return { isValid: true, message: '' };
  }
}
