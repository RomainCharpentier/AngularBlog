import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  log = true; //false

  constructor() { }

  isLoggedIn(): boolean {
    return this.log;
  }

  login(): void {
    this.log = true;
  }

  logout(): void {
    this.log = false;
  }
}
