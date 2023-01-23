import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RepliesIndex, JsonData } from 'src/app/models/Comment.model';

@Component({
  selector: 'app-add-reply',
  templateUrl: './add-reply.component.html',
  styleUrls: ['./add-reply.component.scss'],
})
export class AddReplyComponent {
  inputContent: string = '';
  myComment: RepliesIndex;
  @Input() replyIndex: number = -1;
  @Input() jsonData: JsonData;
  @Output() addedReply = new EventEmitter<RepliesIndex>();
  addReply(id: number) {
    this.myComment = {
      comment: {
        id: 1,
        content: this.inputContent,
        createdAt: String(Date.now()),
        score: 0,
        replyingTo: this.jsonData.comments[id].user.username,
        user: {
          image: {
            png: this.jsonData.currentUser.image.png,
            webp: this.jsonData.currentUser.image.webp,
          },
          username: 'juliusomo',
        },
      },
      index: id,
    };
    this.addedReply.emit(this.myComment);
    this.inputContent = '';
  }
}
