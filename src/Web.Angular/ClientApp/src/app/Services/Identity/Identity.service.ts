import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppUser } from '../../Models/Identity/AppUser';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

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
}
