import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Comment,
  JsonData,
  JsonReplies,
  RepliesIndex,
  Reply,
} from '../models/Comment.model';
import { formatDistance } from 'date-fns';
@Component({
  selector: 'app-user-comments',
  templateUrl: './user-comments.component.html',
  styleUrls: ['./user-comments.component.scss'],
})
export class UserCommentsComponent {
  @Input() jsonData: JsonData;
  @Input() index: number = -1;
  data: Comment;
  @Output() addMyComment = new EventEmitter<Comment>();
  @Output() deleteMyComment = new EventEmitter<number>();
  @Output() deleteMyReply = new EventEmitter<JsonReplies>();
  editMyBoolean: boolean = true;
  editMyInput: string = '';
  replyBoolean: boolean = false;
  deleteComment(id: number) {
    this.deleteMyComment.emit(id);
  }

  editMyComment(id: number) {
    this.jsonData.comments.forEach((element: Comment, i: number) => {
      if (id == i) {
        this.editMyInput = element.content;
        this.editMyBoolean = false;
      }
    });
  }
  updateComment(id: number) {
    this.jsonData.comments.forEach((element: Comment, i: number) => {
      if (id == i) {
        element.content = this.editMyInput;
        this.editMyBoolean = true;
      }
    });
    localStorage.setItem('commentsData', JSON.stringify(this.jsonData));
  }
  replyComment(id: number) {
    this.jsonData.comments.forEach((element: Comment, i: number) => {
      if (id == i) {
        this.replyBoolean = !this.replyBoolean;
      }
    });
  }
  deleteReply(jsonReplies: JsonReplies) {
    this.deleteMyReply.emit(jsonReplies);
  }
  addReply(replies: RepliesIndex) {
    if (replies.comment.content.length > 0) {
      this.replyBoolean = false;
      this.jsonData.comments.forEach((element: Comment, i: number) => {
        if (replies.index == i) {
          this.jsonData.comments[replies.index].replies.push(replies.comment);
        }
      });
      localStorage.setItem('commentsData', JSON.stringify(this.jsonData));
    }
  }
  increaseRating(id: number) {
    this.jsonData.comments.forEach((element: Comment, i: number) => {
      if (id == i) {
        element.score += 1;
        this.jsonData.comments = this.jsonData.comments.sort(
          (a: Comment, b: Comment) => b.score - a.score
        );
      }
    });
    localStorage.setItem('commentsData', JSON.stringify(this.jsonData));
  }
  decreaseRating(id: number) {
    this.jsonData.comments.forEach((element: Comment, i: number) => {
      if (id == i && element.score != 0) {
        element.score -= 1;
        this.jsonData.comments = this.jsonData.comments.sort(
          (a: Comment, b: Comment) => b.score - a.score
        );
      }
    });
    localStorage.setItem('commentsData', JSON.stringify(this.jsonData));
  }
  ngOnInit() {
    if (
      this.jsonData &&
      !Number.isNaN(Number(this.jsonData.comments[this.index].createdAt))
    ) {
      this.data = {
        ...this.jsonData.comments[this.index],
        createdAt: formatDistance(
          new Date(),
          new Date(+this.jsonData.comments[this.index].createdAt)
        ) + ' ' + 'ago',
      };
      } else {
        this.data = this.jsonData.comments[this.index];
      }
    }
  }

