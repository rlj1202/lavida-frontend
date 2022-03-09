import Head from 'next/head'
import Link from 'next/link'
import { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next'

import Config from '../config'

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
    }
  }
}

const Home: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({}) => {
  return (
    <>
      <Head>
        <title>{Config.title}</title>
      </Head>

      <div className="boards">
        <div className="board">
          <h1><Link href="/boards/notice"><a>공지사항</a></Link></h1>
          <article className="notice">
            <h2>제목</h2>
            <div>
              여기에 내용을 적어주세요.
            </div>
          </article>
        </div>
        <div className="board">
          <h1>새로운 문제</h1>
          <ul>
            <li>1000 - 이런식으로</li>
            <li>1001 - 문제가</li>
            <li>1002 - 있을</li>
            <li>1003 - 예정</li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        .boards {
        }
        .board h1 {
          font-size: 34px;
        }
        .board {
          margin: 50px 0;
        }
      `}</style>
    </>
  )
}

export default Home
