import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import ILoginResponse from '../../interfaces/ILoginResponse';
import IUser from '../../interfaces/IUser';
import { getApiRequestConfig, getApiUrl, isServerSide } from '../utils';

export const doLogin = async (
  username: string,
  password: string,
): Promise<ILoginResponse> => {
  if (isServerSide()) {
    throw new Error('login can only be call on client side.');
  }

  const response = await axios.post<ILoginResponse>(`/api/auth/login`, {
    username,
    password,
  });

  const data = response.data;

  localStorage.setItem('refresh_token', data.refreshToken);

  return data;
};

export const doLogout = async () => {
  if (isServerSide()) {
    throw new Error('logout can only be call on client side.');
  }

  const response = await axios.post(`/api/auth/logout`);

  localStorage.removeItem('refresh_token');
};

export const doGetUserInfo = async (
  context: GetServerSidePropsContext,
): Promise<IUser> => {
  const response = await axios.post<IUser>(
    getApiUrl(`/api/auth/userinfo`),
    undefined,
    {
      ...getApiRequestConfig(context),
    },
  );

  return response.data;
};
