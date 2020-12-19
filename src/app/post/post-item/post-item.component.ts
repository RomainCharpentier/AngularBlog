import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent implements OnInit {

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
