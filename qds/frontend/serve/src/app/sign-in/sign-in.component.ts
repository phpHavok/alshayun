import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.auth.getCurrentUser() !== null) {
      this.router.navigate(['/']);
    }
  }

  signIn(form) {
    if (this.auth.signIn(form.form.value.username, form.form.value.password)) {
      this.router.navigate(['/']);
    } else {
      (form as NgForm).control.setErrors({noAuth: true});
    }
  }

}
