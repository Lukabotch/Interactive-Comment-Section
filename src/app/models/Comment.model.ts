export interface Reply {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  replyingTo: string;
  user: User;
}
export interface Image {
  png: string;
  webp: string;
}
export interface User {
  image: Image;
  username: string;
}
export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replies: Reply[];
}
export interface JsonData {
  currentUser: User;
  comments: Comment[];
}
export interface JsonReplies {
  main: number;
  nested: number;
}
export interface Replies {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  replyingTo: string;

  user: User;
}
export interface RepliesIndex {
  comment: Replies;
  index: number;
}
