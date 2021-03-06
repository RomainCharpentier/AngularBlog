import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShareDialogComponent } from '../../share-dialog/share-dialog.component';

@Component({
  selector: 'app-post',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent implements OnInit {

  @Input() id = 0;
  @Input() author = '';
  @Input() content = '';
  @Input() like = 0;
  @Input() createdAt: Date = new Date();
  @Output() remove = new EventEmitter<string>();

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onLike(): void {
    console.log('like');
    this.like++;
  }

  onComment(): void {
    console.log('comment');
  }

  onShare(): void {
    console.log('share');
    const dialogRef = this.dialog.open(ShareDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
