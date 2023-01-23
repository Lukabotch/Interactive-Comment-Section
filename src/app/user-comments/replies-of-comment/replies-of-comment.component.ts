import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {
  Comment,
  JsonData,
  JsonReplies,
  RepliesIndex,
  Reply,
} from '../../models/Comment.model';
import { formatDistance } from 'date-fns';
@Component({
  selector: 'app-replies-of-comment',
  templateUrl: './replies-of-comment.component.html',
  styleUrls: ['./replies-of-comment.component.scss'],
})
export class RepliesOfCommentComponent implements OnInit {
  @Input() jsonData: JsonData;
  @Input() replies: Reply;
  @Input() index: number = -1;
  @Input() mainInd: number = -1;
  @Output() jsonReply = new EventEmitter<JsonReplies>();
  comp: number;
  darkOverlay: boolean = true;
  nestedReplyBoolean: boolean = false;
  deleteIndex: JsonReplies;
  clickEditBoolean: boolean = true;
  updateClickBoolean: boolean = false;
  editReplyInput: string = '';
  deleteReply(id: number) {
    this.deleteIndex = {
      main: this.mainInd,
      nested: id,
    };
    this.jsonReply.emit(this.deleteIndex);
  }
  editComment(id: number, mainId: number) {
    this.jsonData.comments[mainId].replies.forEach((v: Reply, i: number) => {
      if (id == i) {
        this.clickEditBoolean = false;
        this.updateClickBoolean = true;
        this.editReplyInput = this.replies.content;
      }
    });

    localStorage.setItem('commentsData', JSON.stringify(this.jsonData));
  }
  updateReplyComment(id: number, mainId: number) {
    this.jsonData.comments[mainId].replies.forEach((v: Reply, i: number) => {
      if (id == i) {
        v.content = this.editReplyInput;
        this.replies.content = this.editReplyInput;
        this.clickEditBoolean = true;
        this.updateClickBoolean = false;
      }
    });
    localStorage.setItem('commentsData', JSON.stringify(this.jsonData));
  }
  increaseRating(id: number, mainId: number) {
    this.jsonData.comments[mainId].replies.forEach((v: Reply, i: number) => {
      if (id == i) {
        v.score++;
      }
    });
    this.jsonData.comments[mainId].replies = this.jsonData.comments[
      mainId
    ].replies.sort((a: Reply, b: Reply) => b.score - a.score);
    localStorage.setItem('commentsData', JSON.stringify(this.jsonData));
  }
  decreaseRating(id: number, mainId: number) {
    this.jsonData.comments[mainId].replies.forEach((v: Reply, i: number) => {
      if (id == i && v.score != 0) {
        v.score--;
      }
    });
    this.jsonData.comments[mainId].replies = this.jsonData.comments[
      mainId
    ].replies.sort((a: Reply, b: Reply) => b.score - a.score);
    localStorage.setItem('commentsData', JSON.stringify(this.jsonData));
  }

  nestedReply(id: number, mainId: number) {
    this.jsonData.comments[mainId].replies.forEach(
      (element: Reply, i: number) => {
        if (id == i) {
          this.nestedReplyBoolean = true;
        }
      }
    );
  }
  addNestedReply(obj: RepliesIndex) {
    if (obj.comment.content.length > 0) {
      this.jsonData.comments[obj.index].replies.push(obj.comment);
      this.nestedReplyBoolean = false;
      localStorage.setItem('commentsData', JSON.stringify(this.jsonData));
    }
  }
  ngOnInit(): void {
    if (
      this.jsonData &&
      !Number.isNaN(
        Number(
          this.jsonData.comments[this.mainInd].replies[this.index].createdAt
        )
      )
    ) {
      this.replies = {
        ...this.jsonData.comments[this.mainInd].replies[this.index],
        createdAt:
          formatDistance(
            new Date(),
            new Date(
              +this.jsonData.comments[this.mainInd].replies[this.index]
                .createdAt
            )
          ) +
          ' ' +
          'ago',
      };
      localStorage.setItem('commentsData', JSON.stringify(this.jsonData));
    } else {
      this.replies = this.jsonData.comments[this.mainInd].replies[this.index];
    }
  }
}
