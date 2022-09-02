import { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { GetServerSidePropsContext } from 'next';

export const isServerSide = () => {
  return typeof window === 'undefined';
};

export const getApiUrl = (apiPath: string) => {
  return `${isServerSide() ? process.env.API_HOST : ''}${apiPath}`;
};

export const getApiRequestConfig = (
  context: GetServerSidePropsContext,
): AxiosRequestConfig => {
  if (!isServerSide()) {
    return {};
  }

  return {
    headers: {
      Authorization: `Bearer ${context.req.cookies['access_token']}`,
    },
  };
};
