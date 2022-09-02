import axios from 'axios';
import IBoard from '../../interfaces/IBoard';
import { getApiUrl } from '../utils';

export const doGetBoards = async (): Promise<IBoard[]> => {
  const response = await axios.get<IBoard[]>(getApiUrl('/api/boards'));

  return response.data;
};

export const doGetBoard = async (slug: string): Promise<IBoard> => {
  const response = await axios.get<IBoard>(getApiUrl(`/api/boards/${slug}`));

  return response.data;
};
