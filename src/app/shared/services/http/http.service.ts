import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ErrorService } from '../error/error.service';
import { environment } from '../../../../environments/environment';
import { ApiMethod } from '../../interfaces/api.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private httpClient: HttpClient,
    private errorService: ErrorService,
    private router: Router
  ) {
  }

  /**
   * Make an http request
   */
  requestCall(path: string, method: ApiMethod, data?: any): Observable<any> {
    let response: Observable<any>;
    let reqObservable: Observable<any> = EMPTY;
    const apiUrl = `${environment.apiUrl}${path}`;
    console.log('HttpService.requestCall, apiUrl=', apiUrl);
    switch (method) {
      case ApiMethod.GET:
        reqObservable = this.httpClient.get(apiUrl);
        break;
      case ApiMethod.DELETE:
        reqObservable = this.httpClient.delete(apiUrl);
        break;
      case ApiMethod.PATCH:
        reqObservable = this.httpClient.patch(apiUrl, data);
        break;
      case ApiMethod.POST:
        reqObservable = this.httpClient.post(apiUrl, data);
        break;
      case ApiMethod.PUT:
        reqObservable = this.httpClient.put(apiUrl, data);
        break;
    }
    response = reqObservable
      .pipe(catchError((err) => this.handleError(err, this)));
    return response;
  }

  /**
   * Handle any errors that occur during the request
   */
  handleError(error: HttpErrorResponse, self: HttpService): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      console.error(`An error occurred: ${error.error.message}`);
    } else {
      if (error.status === 401) {
        this.router.navigateByUrl('/auth/login');
      }
      return this.errorService.handleRequestError(error.status, error.error.message, error.error);
    }
    return EMPTY;
  }
}
