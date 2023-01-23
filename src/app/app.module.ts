import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UserCommentsComponent } from './user-comments/user-comments.component';
import { AddCommentComponent } from './user-comments/add-comment/add-comment.component';
import { FormsModule } from '@angular/forms';
import { RepliesOfCommentComponent } from './user-comments/replies-of-comment/replies-of-comment.component';
import { AddReplyComponent } from './user-comments/add-reply/add-reply.component';
import { AddNestedReplyComponent } from './user-comments/add-nested-reply/add-nested-reply.component';

@NgModule({
  declarations: [
    AppComponent,
    UserCommentsComponent,
    AddCommentComponent,
    RepliesOfCommentComponent,
    AddReplyComponent,
    AddNestedReplyComponent,
  ],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
