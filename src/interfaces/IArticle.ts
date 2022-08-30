import IUser from './IUser';
import IBoard from './IBoard';
import IComment from './IComment';

export default interface IArticle {
  id: number;
  title: string;
  authorId?: number;
  author?: IUser;
  boardId?: number;
  board?: IBoard;
  comments?: IComment[];
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
