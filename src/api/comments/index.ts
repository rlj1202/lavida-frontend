import axios from 'axios';
import IComment from '../../interfaces/IComment';
import { getApiUrl } from '../utils';

export const doGetComments = async () => {
  await axios.get(getApiUrl(`/api/comments`));
};

export const doCreateComment = async (articleId: number, content: string) => {
  await axios.post(
    getApiUrl(`/api/comments`),
    {
      content,
    },
    {
      params: {
        article: articleId,
      },
    },
  );
};

export const doCreateSubComment = async (
  commentId: number,
  content: string,
) => {
  const response = await axios.post<IComment>(
    getApiUrl(`/api/comments/${commentId}`),
    {
      content,
    },
  );

  return response.data;
};

export const doDeleteComment = async (commentId: number) => {
  const response = await axios.delete(getApiUrl(`/api/comments/${commentId}`));
};

export const doUpdateComment = async (
  commentId: number,
  content: string,
): Promise<IComment> => {
  const response = await axios.patch<IComment>(
    getApiUrl(`/api/comments/${commentId}`),
    {
      content,
    },
  );

  return response.data;
};
