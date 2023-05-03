import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GetGroupsQueryResultDTO } from '../../DTOs/Group/GetGroupsQueryResultDTO';
import { Observable } from 'rxjs';
import { CreateGroupResponseDTO } from 'src/app/DTOs/Group/CreateGroupResponseDTO';
import { CreateGroupRequestDTO } from '../../DTOs/Group/CreateGroupRequestDTO';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  apiUrl = 'http://localhost:5272/api/Groups';

  constructor(private http: HttpClient) {}

  GetGroups(){
    return this.http.get<GetGroupsQueryResultDTO[]>(this.apiUrl);
  }


  Create(name: string, description: string) : Observable<CreateGroupResponseDTO>;
  Create(request:CreateGroupRequestDTO) : Observable<CreateGroupResponseDTO>;
  Create(request:CreateGroupRequestDTO | string, name?:string, description?:string) : Observable<CreateGroupResponseDTO> {
    if(typeof name === 'string' && typeof description === 'string'){
      var userId = localStorage.getItem('userId');
      request = new CreateGroupRequestDTO(name, description, userId!);
    }

    return this.http.post<CreateGroupResponseDTO>(this.apiUrl, request);
  }
  
}
