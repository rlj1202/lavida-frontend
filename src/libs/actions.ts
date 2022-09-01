import axios from 'axios';
import IArticle from '../interfaces/IArticle';
import ILoginResponse from '../interfaces/ILoginResponse';
import IUser from '../interfaces/IUser';

const isServerSide = () => {
  return typeof window === 'undefined';
};

export const login = async (username: string, password: string) => {
  if (isServerSide()) {
    throw new Error('login can only be call on client side.');
  }

  const response = await axios.post<ILoginResponse>(`/api/auth/login`, {
    username,
    password,
  });

  const data = response.data;

  localStorage.setItem('refresh_token', data.refreshToken);
};

export const logout = async () => {
  if (isServerSide()) {
    throw new Error('logout can only be call on client side.');
  }

  const response = await axios.post(`/api/auth/logout`);

  localStorage.removeItem('refresh_token');
};

export const getUserInfo = async (): Promise<IUser> => {
  if (isServerSide()) {
    throw new Error('getUserInfo can only be call on client side.');
  }

  const response = await axios.post<IUser>(`/api/auth/userinfo`);

  return response.data;
};

export const getArticle = async (id: number): Promise<IArticle> => {
  const url = `${
    isServerSide() ? process.env.API_HOST : ''
  }/api/articles/${id}`;
  const response = await axios.get<IArticle>(url);
  return response.data;
};

export const createArticle = async (
  title: string,
  content: string,
  boardSlug: string,
): Promise<IArticle> => {
  const url = `${isServerSide() ? process.env.API_HOST : ''}/api/articles`;
  const response = await axios.post<IArticle>(
    url,
    {
      title,
      content,
    },
    { params: { board: boardSlug } },
  );

  return response.data;
};
