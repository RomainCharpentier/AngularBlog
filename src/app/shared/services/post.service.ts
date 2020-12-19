import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  path = '/post';

  constructor(private api: ApiService) { }

  getPosts(term?: any): Observable<Post[]> {
    return this.api.get(this.path);
  }

}
