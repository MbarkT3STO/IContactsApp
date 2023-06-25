import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppUser } from '../../Models/Identity/AppUser';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { UpdateEmailRequest } from 'src/app/DTOs/Identity/UpdateEmailRequest';
import { UpdateEmailResponse } from 'src/app/DTOs/Identity/UpdateEmailResponse';
import { UpdatePasswordRequest } from 'src/app/DTOs/Identity/UpdatePasswordRequest';
import { UpdatePasswordResponse } from 'src/app/DTOs/Identity/UpdatePasswordResponse';
import { UpdateUserRequest } from 'src/app/DTOs/Identity/UpdateUserRequest';
import { UpdateUserResponse } from 'src/app/DTOs/Identity/UpdateUserResponse';

@Injectable({
  providedIn: 'root',
})
export class IdentityService {
  apiUrl = 'http://localhost:5272/api/Identity';

  constructor(private http: HttpClient, private cookieService:CookieService) {}

  GetUserById(id: string) {
    return this.http.post<AppUser>(this.apiUrl + '/GetUserById', id);
  }

  GetUserByUserName(): Observable<AppUser>;
  GetUserByUserName(userName: string): Observable<AppUser>;

  GetUserByUserName(userName?: string): Observable<AppUser> {
    if (userName) {
      return this.http.post<AppUser>(`${this.apiUrl}/GetUserByName?name=${userName}`,null);
    }
    else {
      const storedUserName = localStorage.getItem('username');
      return this.http.post<AppUser>(`${this.apiUrl}/GetUserByName?name=${storedUserName}`,null);
    }
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


  UpdateEmail(request: UpdateEmailRequest): Observable<UpdateEmailResponse> {
    return this.http.post<UpdateEmailResponse>(`${this.apiUrl}/UpdateEmail`, request);
  }

  UpdatePassword(request: UpdatePasswordRequest): Observable<UpdatePasswordResponse>{
    return this.http.post<UpdatePasswordResponse>(`${this.apiUrl}/UpdatePassword`, request);
  }

  UpdateUser(request: UpdateUserRequest): Observable<UpdateUserResponse>{
    return this.http.post<UpdateUserResponse>(`${this.apiUrl}/UpdateUser`, request);
  }

  UpdateUserFromForm(request: FormData): Observable<UpdateUserResponse>{
    return this.http.post<UpdateUserResponse>(`${this.apiUrl}/UpdateUser`, request);
  }
}
