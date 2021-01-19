import { Post } from './../../../shared/models/post.model';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../../../shared/services/post/post.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { WriteDialogComponent } from '../../write-dialog/write-dialog.component';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = [];

  constructor(private postService: PostService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.postService.getPosts()
      .subscribe(
        data => {
          this.posts = data;
          // Il manque les id dans l'api
          this.posts.forEach((post, index) => post.id = index);
        }
      );
  }

  createItem(): void {
    console.log('create');
    const dialogRef = this.dialog.open(WriteDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('result:', result, '.')
      if (result !== undefined) {
        const post: Post = { id: 0, author: '', content: result, like: 0, comments: [] };
        this.postService.createPost(post).subscribe(
          () => { if (!this.posts.map(x => x.id).includes(post.id)) { this.posts.unshift(post); } });
      }
      console.log('The dialog was closed');
    });
  }

  removeItem(id: number): void {
    this.posts = this.posts.filter(post => post.id !== id);
  }

  ngOnDestroy(): void {
    console.log('calling ngOnDestroy::PostListComponent');
  }
}
