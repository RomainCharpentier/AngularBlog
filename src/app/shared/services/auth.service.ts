import { EMPTY, Observable } from 'rxjs';
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

  login(): Observable<any> {
    this.log = true;
    throw new Error('Method not implemented.');
  }

  logout(): void {
    this.log = false;
  }

  isAuthenticated(): boolean {
    throw new Error('Method not implemented.');
  }

  register(arg0: any): Observable<any> {
    throw new Error('Method not implemented.');
  }
}
