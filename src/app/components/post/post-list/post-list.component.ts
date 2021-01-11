import { Post } from '../../../shared/models/post.model';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../../../shared/services/post/post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = [];

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.postService.getPosts()
    .subscribe(
      data => {
        this.posts = data;
        const post: Post = {title: 'test', content: 'content', like: 0};
        this.posts.push(post);
        this.posts.push(post);
        this.posts.push(post);
        this.posts.push(post);
      },
      err => console.log(err)
    );
  }

  removeItem(title: string): void {
    this.posts = this.posts.filter(post => post.title !== title);
  }

  ngOnDestroy(): void {
    console.log('calling ngOnDestroy::PostListComponent');
  }
}
