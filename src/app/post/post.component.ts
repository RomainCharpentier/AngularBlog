import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() title: string = '';
  @Input() content: string = '';
  @Input() like: number = 0;
  @Input() createdAt: Date = new Date();

  constructor() { }

  ngOnInit() {
  }

  onLike() {
    console.log('like');
  }

  onShare() {
    console.log('share');
  }

}
