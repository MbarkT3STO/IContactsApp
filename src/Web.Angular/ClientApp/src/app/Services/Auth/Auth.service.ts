import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponseModel } from 'src/app/Models/Auth/LoginResponseModel';
import { LoginModel } from 'src/app/Models/Auth/loginModel';

@Injectable()
export class AuthService {
  apiUrl = 'http://localhost:5272';

  constructor(private http: HttpClient) {}

  Login(model: LoginModel) {
    return this.http.post<LoginResponseModel>(this.apiUrl + '/api/Auth/Login', model);
  }

  RefreshToken() {
    return this.http.post(this.apiUrl + '/api/Auth/RefreshToken', {});
  }
}
