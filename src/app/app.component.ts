import { Component, OnInit } from '@angular/core';
import { formatDistance } from 'date-fns';
import data from '../../data.json';
import { Comment, JsonData, JsonReplies, Reply } from './models/Comment.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'comment-app-angular';
  refData = JSON.stringify(data);
  jsonData: JsonData = JSON.parse(this.refData);
  commentsData = localStorage.getItem('commentsData');
  darkOverlay: boolean = false;
  darkOverlayReply: boolean = false;
  deleteModal: number;
  deleteReplyModal: JsonReplies = { main: -1, nested: -1 };
  distanceComment: number;
  addComment(myComment: Comment) {
    if (myComment.content.length > 0) {
      this.jsonData.comments.push(myComment);
      localStorage.setItem('commentsData', JSON.stringify(this.jsonData));
    }
  }
  deleteMyComment(id: number) {
    this.deleteModal = id;
    this.darkOverlay = true;
  }
  deleteMyCommentModal() {
    this.jsonData.comments = this.jsonData.comments.filter(
      (v: Comment, i: number) => this.deleteModal != i
    );
    this.darkOverlay = false;
    localStorage.setItem('commentsData', JSON.stringify(this.jsonData));
  }
  deleteMyReply(jsonReplies: JsonReplies) {
    this.deleteReplyModal.main = jsonReplies.main;
    this.deleteReplyModal.nested = jsonReplies.nested;
    this.darkOverlayReply = true;
  }
  deleteMyReplyModal() {
    this.jsonData.comments[this.deleteReplyModal.main].replies =
      this.jsonData.comments[this.deleteReplyModal.main].replies.filter(
        (v: Reply, i: number) => i != this.deleteReplyModal.nested
      );
    this.darkOverlayReply = false;
    localStorage.setItem('commentsData', JSON.stringify(this.jsonData));
  }
  ngOnInit() {
    this.jsonData.comments = this.jsonData.comments.sort(
      (a: Comment, b: Comment) => b.score - a.score
    );
    if (this.commentsData) {
      this.jsonData = JSON.parse(this.commentsData);
    } else {
      this.jsonData = JSON.parse(this.refData);
    }
  }
}
