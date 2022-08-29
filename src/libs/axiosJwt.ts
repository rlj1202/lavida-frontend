import axios, { AxiosRequestConfig } from 'axios';

const client = axios.create({});

const withAccessToken = (config: AxiosRequestConfig) => {
  if (!config.headers) return config;

  const accessToken = localStorage.getItem('access_token');
  config.headers['Authorization'] = `Bearer ${accessToken}`;

  return config;
};

client.interceptors.request.use(function (config) {
  config = withAccessToken(config);
});

client.interceptors.response.use(
  function (config) {
    return config;
  },
  async function (error) {
    if (error.response && error.response.status == 403) {
      try {
        const originalRequest = error.config;

        const data = await client.post('/api/auth/refresh');
      } catch (err) {}
    }
  },
);

export default client;
