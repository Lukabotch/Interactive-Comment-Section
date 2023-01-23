import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  JsonData,
  Reply,
  Comment,
  RepliesIndex,
} from 'src/app/models/Comment.model';

@Component({
  selector: 'app-add-nested-reply',
  templateUrl: './add-nested-reply.component.html',
  styleUrls: ['./add-nested-reply.component.scss'],
})
export class AddNestedReplyComponent {
  @Input() jsonData: JsonData;
  @Input() replies: Reply;
  @Input() mainInd: number = -1;
  inputContent: string;
  @Input() index: number;
  myNested: RepliesIndex;
  @Input() nestedReplyBoolean: boolean = false;
  @Output() addNested = new EventEmitter<RepliesIndex>();
  addNestedReply(id: number, mainId: number) {
    this.myNested = {
      comment: {
        id: 1,
        content: this.inputContent,
        createdAt: String(Date.now()),
        score: 0,
        replyingTo: this.jsonData.comments[mainId].replies[id].user.username,
        user: {
          image: {
            png: this.jsonData.currentUser.image.png,
            webp: this.jsonData.currentUser.image.webp,
          },
          username: 'juliusomo',
        },
      },
      index: mainId,
    };
    this.addNested.emit(this.myNested);
  }
}
