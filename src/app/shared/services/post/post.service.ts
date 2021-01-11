import { HttpService } from './../http/http.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../models/post.model';
import { ApiMethod } from '../../interfaces/api.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  path = '/post';

  constructor(private httpService: HttpService) { }

  getPosts(term?: any): Observable<Post[]> {
    return this.httpService.requestCall(this.path, ApiMethod.GET);
  }

}
