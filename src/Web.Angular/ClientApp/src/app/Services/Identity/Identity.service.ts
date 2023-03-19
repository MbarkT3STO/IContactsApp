import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppUser } from '../../Models/Identity/AppUser';

@Injectable({
  providedIn: 'root',
})
export class IdentityService {
  apiUrl = 'http://localhost:5272/api/Identity';

  constructor(private http: HttpClient) {}

  GetUserById(id: string) {
    return this.http.post<AppUser>(this.apiUrl + '/GetUserById', id);
  }

  GetUserByUserName(userName: string) {
    return this.http.post<AppUser>(
      this.apiUrl + '/GetUserByUserName',
      userName
    );
  }

  GetUserRoles(id: string) {
    return this.http.post<string[]>(this.apiUrl + '/GetUserRoles', id);
  }

  IsUserInRole(id: string, role: string) {
    return this.http.post<boolean>(
      `${this.apiUrl}/IsUserInRole?id=${id}&role=${role}`,
      {}
    );
  }
}
