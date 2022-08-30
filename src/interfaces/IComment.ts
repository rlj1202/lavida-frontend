import IUser from './IUser';
import IArticle from './IArticle';

export default interface IComment {
  id: number;
  content: string;
  authorId?: number;
  author?: IUser;
  articleId?: number;
  article?: IArticle;
  createdAt: Date;
  updatedAt: Date;
}
