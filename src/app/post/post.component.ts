import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() title = '';
  @Input() content = '';
  @Input() like = 0;
  @Input() createdAt: Date = new Date();
  @Output() remove = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onLike(): void {
    console.log('like');
  }

  onShare(): void {
    console.log('share');
  }
}
