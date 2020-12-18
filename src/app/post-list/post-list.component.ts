import { Component, OnInit } from '@angular/core';
import data from '../../assets/data.json';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  posts = data;

  constructor() { }

  ngOnInit(): void { }

  removeItem(title: string): void {
    this.posts = this.posts.filter(post => post.title !== title);
  }
}
