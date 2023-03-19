import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../../Models/Auth/loginModel';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/Auth/Auth.service';
import { IdentityService } from '../../Services/Identity/Identity.service';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css'],
})
export class LoginComponent implements OnInit {
  model: LoginModel = new LoginModel();

  constructor(
    private router: Router,
    private auth: AuthService,
    private identity: IdentityService
  ) {}

  ngOnInit() {
    if (this.auth.IsLoggedIn()) {
      this.auth.CheckUser();
    }
  }

  login() {
    this.auth.Login(this.model).subscribe(
      (response) => {
        if (response.isSucceeded) {
          localStorage.setItem('userId', response.userId);
          localStorage.setItem('username', response.username);
          localStorage.setItem('token', response.token);
          localStorage.setItem('createdAt', response.createdAt);
          localStorage.setItem('expiresAt', response.expiresAt);
          localStorage.setItem('refreshToken', response.refreshToken);

          this.router.navigate(['/User-Dashboard']);
        }
      },
      (error) => {
        alert(error.error);
      }
    );
  }
}
