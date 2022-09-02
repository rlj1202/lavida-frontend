import axios from 'axios';
import ICreateUserDto from '../../interfaces/ICreateUserDto';
import IUser from '../../interfaces/IUser';
import { getApiUrl } from '../utils';

export const doCreateUser = async (dto: ICreateUserDto): Promise<IUser> => {
  const response = await axios.post<IUser>(getApiUrl(`/api/users`), dto);

  return response.data;
};

export const doGetUser = async (username: string): Promise<IUser> => {
  const response = await axios.get<IUser>(getApiUrl(`/api/users/${username}`));

  return response.data;
};
