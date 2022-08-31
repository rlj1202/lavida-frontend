import Head from 'next/head';
import { NextPage } from 'next';

import Config from '../config';
import DefaultWrapper from '../components/defaultWrapper';
import { FormEvent, useState } from 'react';
import axios from 'axios';
import IUser from '../interfaces/IUser';
import { useRouter } from 'next/router';

const Register: NextPage = ({}) => {
  const router = useRouter();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const doRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await axios.post<IUser>(`/api/users`, {
      username: username,
      password: password,
      email: email,
    });

    await axios.post(`/api/auth/login`, {
      username: username,
      password: password,
    });

    router.back();
  };

  return (
    <>
      <Head>
        <title>{`${Config.title} - Register`}</title>
      </Head>

      <DefaultWrapper>
        <div className="form">
          <form onSubmit={doRegister}>
            <header className="title">회원가입</header>
            <div className="row">
              <label className="label" htmlFor="id">
                아이디
              </label>
              <input
                className="input"
                id="id"
                placeholder="id"
                name="id"
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
            <div className="row">
              <label className="label" htmlFor="passwordCheck">
                비밀번호 확인
              </label>
              <input
                className="input"
                id="passwordCheck"
                placeholder="password"
                type="password"
                name="passwordCheck"
                value={passwordCheck}
                onChange={(event) => setPasswordCheck(event.target.value)}
                required
              />
            </div>
            {/* <div className="row">
              <label className="label" htmlFor="name">
                이름
              </label>
              <input
                className="input"
                id="name"
                placeholder="name"
                name="name"
                required
              />
            </div> */}
            <div className="row">
              <label className="label" htmlFor="e-mail">
                이메일
              </label>
              <input
                className="input"
                id="e-mail"
                placeholder="e-mail"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <button className="button" type="submit">
              확인
            </button>
          </form>
        </div>
      </DefaultWrapper>

      <style jsx>{`
        .form {
          border-radius: 10px;
          border: 1px solid #dddddd;
          padding: 10px 20px;
          width: 400px;
          margin: 0 auto;
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

export default Register;
