import Link from 'next/link'

// import useSWR from 'swr'
import fetcher from '../libs/fetcher'
import { IUser } from '../interfaces/IUser'

const Topbar = ({}) => {
  // const { data, error } = useSWR('/auth/info', fetcher)
  // const info = data as (IUser | undefined | null)
  // const loggedIn = info?.id ? true : false
  const info: any = {}
  const loggedIn = false

  return (
    <div className="topbar">
      <div className="topbar-left">
        <div className="topbar-logo">
          <Link href="/"><a>{'{ Lavida }'}</a></Link>
        </div>
        <div className="topbar-pagelink"><Link href="/"><a>FAQ</a></Link></div>
        <div className="topbar-pagelink"><Link href="/boards"><a>Forum</a></Link></div>
        <div className="topbar-pagelink"><Link href="/problems"><a>Problems</a></Link></div>
        <div className="topbar-pagelink"><Link href="/status"><a>Status</a></Link></div>
        <div className="topbar-pagelink"><Link href="/contests"><a>Contest</a></Link></div>
        <div className="topbar-pagelink"><Link href="/"><a>Tools</a></Link></div>
      </div>
      <div className="topbar-right">
        <div className="topbar-buttons">
          {!loggedIn && <>
            <span className="topbar-button login">
              <Link href="/login"><a>로그인</a></Link>
            </span>
            <span className="topbar-button register">
              <Link href="/register"><a>회원가입</a></Link>
            </span>
          </>}
          {loggedIn && <>
            <span>
              {info?.authId + ':' + info?.name}
            </span>
            <span className="topbar-button">
              <Link href="/"><a>내 정보</a></Link>
            </span>
            <span className="topbar-button logout">
              <Link href="/auth/signout"><a>로그아웃</a></Link>
            </span>
          </>}
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
          border-radius: 5px;
          border: 1px solid #dddddd;

          padding: 5px 20px;
          margin-left: 10px;
        }
        .topbar-button.login {
          background-color: var(--ansi-red);
          color: white;
        }
      `}</style>
    </div>
  )
}

export default Topbar
