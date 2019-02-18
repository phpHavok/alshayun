import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isCollapsed = true;
  user: Observable<User> = null;

  constructor(private auth: AuthService, private router: Router) {
    this.user = this.auth.observeUser();
  }

  ngOnInit() {
  }

  signOut() {
    this.auth.signOut();
    this.router.navigate(['/signin']);
  }

}
