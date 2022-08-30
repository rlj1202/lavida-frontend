import Link from 'next/link';

import { FC, useEffect, useState } from 'react';

import axios from 'axios';
import { useRouter } from 'next/router';

const Topbar: FC<{}> = ({}) => {
  const router = useRouter();

  const [userInfo, setUserInfo] = useState<
    | {
        username: string;
      }
    | undefined
  >();

  useEffect(() => {
    axios
      .post('/api/auth/userinfo')
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((err) => {});
  }, [router]);

  const doLogout = async () => {
    axios
      .post('/api/auth/logout')
      .then(async (response) => {
        localStorage.removeItem('refresh_token');

        router.reload();
      })
      .catch((err) => {});
  };

  return (
    <div className="topbar">
      <div className="topbar-left">
        <div className="topbar-logo">
          <Link href="/">
            <a>{'{ Lavida }'}</a>
          </Link>
        </div>
        <div className="topbar-pagelink">
          <Link href="/faq">
            <a>FAQ</a>
          </Link>
        </div>
        <div className="topbar-pagelink">
          <Link href="/boards">
            <a>Forum</a>
          </Link>
        </div>
        <div className="topbar-pagelink">
          <Link href="/problems">
            <a>Problems</a>
          </Link>
        </div>
        <div className="topbar-pagelink">
          <Link href="/status">
            <a>Status</a>
          </Link>
        </div>
        <div className="topbar-pagelink">
          <Link href="/contests">
            <a>Contest</a>
          </Link>
        </div>
        <div className="topbar-pagelink">
          <Link href="/tools">
            <a>Tools</a>
          </Link>
        </div>
      </div>
      <div className="topbar-right">
        <div className="topbar-buttons">
          {!userInfo && (
            <>
              <span className="topbar-button login">
                <Link href="/login">
                  <a>로그인</a>
                </Link>
              </span>
              <span className="topbar-button register">
                <Link href="/register">
                  <a>회원가입</a>
                </Link>
              </span>
            </>
          )}
          {userInfo && (
            <>
              <span>{userInfo.username}</span>
              <span className="topbar-button">
                <Link
                  href={{
                    pathname: '/users/[username]',
                    query: { username: userInfo.username },
                  }}
                >
                  <a>내 정보</a>
                </Link>
              </span>
              <button className="topbar-button logout" onClick={doLogout}>
                로그아웃
              </button>
            </>
          )}
        </div>
      </div>
      <style jsx>{`
        .topbar {
          font-family: 'NanumSquare', sans-serif;
          border-bottom: 1px solid #dddddd;

          padding: 20px 40px;

          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        }
        .topbar-left {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .topbar-pagelink {
          margin: 0 10px;
        }
        .topbar-logo {
          font-size: 30px;
          font-weight: bold;

          margin-right: 20px;
        }
        .topbar-button {
          font-size: 13px;
          font-family: inherit;
          border-radius: 5px;
          border: 1px solid #dddddd;
          background-color: white;
          cursor: pointer;

          padding: 5px 20px;
          margin-left: 10px;
        }
        .topbar-button.login {
          background-color: var(--ansi-red);
          color: white;
        }
      `}</style>
    </div>
  );
};

export default Topbar;
