import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user = null;
  private userBehaviorSubject: BehaviorSubject<User> = null;
  private userObservable: Observable<User> = null;

  constructor() {
    this.userBehaviorSubject = new BehaviorSubject(this.user);
    this.userObservable = this.userBehaviorSubject.asObservable();
  }

  observeUser(): Observable<User> {
    return this.userObservable;
  }

  getCurrentUser(): User {
    return this.user;
  }

  signIn(username: string, password: string) {
    if (username === "admin" && password === "password") {
      this.user = {
        username: username
      };
      this.userBehaviorSubject.next(this.user);
      return true;
    } else {
      return false;
    }
  }

  signOut() {
    this.user = null;
    this.userBehaviorSubject.next(this.user);
  }
}

export class User {
  username: string
}
