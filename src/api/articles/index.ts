import axios from 'axios';
import IArticle from '../../interfaces/IArticle';
import { getApiUrl } from '../utils';

export const doGetArticles = async (boardSlug: string): Promise<IArticle[]> => {
  const response = await axios.get<IArticle[]>(getApiUrl('/api/articles'), {
    params: { board: boardSlug },
  });

  return response.data;
};

export const doGetArticle = async (id: number): Promise<IArticle> => {
  const response = await axios.get<IArticle>(getApiUrl(`/api/articles/${id}`));
  return response.data;
};

export const doCreateArticle = async (
  title: string,
  content: string,
  boardSlug: string,
): Promise<IArticle> => {
  const response = await axios.post<IArticle>(
    getApiUrl('/api/articles'),
    {
      title,
      content,
    },
    { params: { board: boardSlug } },
  );

  return response.data;
};
