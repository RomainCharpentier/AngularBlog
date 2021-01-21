import { EMPTY, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpService } from './http/http.service';
import { ApiMethod } from '../interfaces/api.interface';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  path = '/auth';
  log = false;

  constructor(private httpService: HttpService) { }

  login(email: string): Observable<any> {
    return this.httpService.requestCall(this.path, ApiMethod.POST, email)
      .pipe(tap((user: User) => {
        localStorage.setItem('user', user.email);
        this.log = true;
      }));
  }

  register(data: User): Observable<any> {
    return this.httpService.requestCall(this.path, ApiMethod.PUT, data);
  }

  logout(): void {
    localStorage.removeItem('user');
    this.log = false;
  }

  isAuthenticated(): boolean {
    return this.log;
  }
}
