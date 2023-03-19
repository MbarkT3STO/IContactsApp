import { Component, OnInit } from '@angular/core';
import { IdentityService } from '../Services/Identity/Identity.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Check-User',
  templateUrl: './Check-User.component.html',
  styleUrls: ['./Check-User.component.css'],
})
export class CheckUserComponent implements OnInit {
  constructor(
    private identityService: IdentityService,
    private router: Router
  ) {}

  ngOnInit() {
    const userId = localStorage.getItem('userId');

    // alert(userId!);

    this.identityService.IsUserInRole(userId!, 'User').subscribe(
      (result) => {
        if (result == true) {
          this.router.navigate(['/User-Dashboard']);
        } else {
          this.router.navigate(['/Admin-Dashboard']);
        }
      },
      (error) => {
        this.router.navigate(['/Login']);
      }
    );
  }
}
