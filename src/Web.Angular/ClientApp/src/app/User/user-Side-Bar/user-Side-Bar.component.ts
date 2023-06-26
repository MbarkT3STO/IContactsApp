import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-Side-Bar',
  templateUrl: './user-Side-Bar.component.html',
  styleUrls: ['./user-Side-Bar.component.css']
})
export class UserSideBarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  goToDashboard() {
    this.router.navigate(['/User-Dashboard']);
  }

}
