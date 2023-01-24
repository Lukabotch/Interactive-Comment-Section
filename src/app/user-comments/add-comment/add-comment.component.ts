import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {
  Comment,
  JsonData,
  JsonReplies,
  RepliesIndex,
} from '../../models/Comment.model';
import { formatDistance, getDate } from 'date-fns';
@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss'],
})
export class AddCommentComponent implements OnInit {
  myComment: Comment;
  inputContent: string = '';
  @Input() jsonData: JsonData;
  @Output() addedComment = new EventEmitter<Comment>();
  addComment() {
    this.myComment = {
      id: 1,
      content: this.inputContent,
      createdAt: String(Date.now()),
      score: 0,
      user: {
        image: {
          png: this.jsonData.currentUser.image.png,
          webp: this.jsonData.currentUser.image.webp,
        },
        username: this.jsonData.currentUser.username,
      },
      replies: [],
    };
    this.addedComment.emit(this.myComment);
    this.inputContent = '';
  }
  ngOnInit(): void {
  }
}
