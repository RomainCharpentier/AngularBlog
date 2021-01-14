import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Post } from 'src/app/shared/models/post.model';

@Component({
  selector: 'app-write-dialog',
  templateUrl: './write-dialog.component.html',
  styleUrls: ['./write-dialog.component.scss']
})
export class WriteDialogComponent {

  title = new FormControl('');
  content = new FormControl('');

  constructor(
    private dialogRef: MatDialogRef<WriteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) { }

  onSave(): void {
    console.log(this.title.value);
    const newPost: Post = { title: this.title.value, content: this.content.value, id: 0, like: 0 };
    console.log('create : ', newPost);
    // this.postService.createPost(newPost).subscribe((data: Post[]) => this.posts = data);
    this.dialogRef.close();
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
