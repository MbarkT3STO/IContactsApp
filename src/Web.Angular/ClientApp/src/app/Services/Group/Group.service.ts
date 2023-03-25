import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GetGroupsQueryResultDTO } from '../../DTOs/Group/GetGroupsQueryResultDTO';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  apiUrl = 'http://localhost:5272/api/Groups';

  constructor(private http: HttpClient) {}

  GetGroups(){
    return this.http.get<GetGroupsQueryResultDTO[]>(this.apiUrl);
  }
}
