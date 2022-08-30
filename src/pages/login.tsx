import Head from 'next/head';
import { NextPage } from 'next';

import Config from '../config';
import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import DefaultWrapper from '../components/defaultWrapper';
import axios from 'axios';
import IUser from '../interfaces/IUser';

const Login: NextPage = ({}) => {
  const router = useRouter();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [user, setUser] = useState<IUser | undefined>();

  useEffect(() => {
    async function getCurUser() {
      const user = await axios
        .post<IUser>(`/api/auth/userinfo`)
        .then((response) => response.data)
        .catch((err) => undefined);

      setUser(user);
    }

    getCurUser();
  }, []);

  const doLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await axios.post<{
      accessToken: string;
      refreshToken: string;
    }>(`/api/auth/login`, {
      username: username,
      password: password,
    });

    const data = await response.data;

    localStorage.setItem('refresh_token', data.refreshToken);

    router.back();
  };

  return (
    <>
      <Head>
        <title>{`${Config.title} - Login`}</title>
      </Head>

      <DefaultWrapper>
        {user && <div>이미 로그인 하셨습니다.</div>}
        {!user && (
          <div className="login-form">
            <form id="login-form" onSubmit={doLogin}>
              <header className="title">로그인</header>
              <div className="row">
                <label className="label" htmlFor="username">
                  아이디
                </label>
                <input
                  className="input"
                  id="username"
                  placeholder="id"
                  name="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  required
                />
              </div>
              <div className="row">
                <label className="label" htmlFor="password">
                  비밀번호
                </label>
                <input
                  className="input"
                  id="password"
                  placeholder="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>
              <button className="button" type="submit">
                확인
              </button>
            </form>
          </div>
        )}
      </DefaultWrapper>

      <style jsx>{`
        .login-form {
          border-radius: 5px;
          border: 1px solid #dddddd;
          width: 400px;
          margin: 0 auto;
          padding: 10px 20px;
          font-family: 'NanumSquare', sans-serif;
        }

        .title {
          font-size: 2rem;
          font-weight: bold;
          margin: 1rem 0;
        }

        .row {
          margin: 0.5rem 0;
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .label {
          width: 100px;
          display: inline-block;
        }
        .input {
          border-radius: 3px;
          border: 1px solid #dddddd;
          padding: 0.5rem;
          flex: 1;
        }

        .button {
          border-radius: 5px;
          border: 1px solid #dddddd;
          padding: 5px 20px;
          background-color: var(--ansi-cyan);
          color: white;
          margin: 0.5rem 0;

          float: right;
          clear: right;
        }
      `}</style>
    </>
  );
};

export default Login;
