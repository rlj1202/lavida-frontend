import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import axios from 'axios';
import dateFormat from 'dateformat';

import IBoard from '../../../interfaces/IBoard';
import IPost from '../../../interfaces/IPost';

interface Props {
  board: IBoard;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context,
) => {
  var { bname } = context.query;

  const response = await axios.get<IBoard>(
    `${process.env.API_HOST}/api/boards/${bname}`,
  );

  return {
    props: {
      board: response.data,
    },
  };
};

const Board: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ board }) => {
  const router = useRouter();
  const { bname } = router.query;

  const posts: IPost[] = [];

  return (
    <>
      <Head>
        <title>{board?.title ?? bname}</title>
      </Head>

      <div className="wrapper">
        <h1>{board?.title ?? bname}</h1>
        <h2>{board?.description ?? 'no description'}</h2>

        <div className="toolbar">
          <span className="toolbar-button newpost">
            <Link href={`/boards/${bname}/create`}>
              <a>새 글 쓰기</a>
            </Link>
          </span>
          <div className="toolbar-search">
            <input className="toolbar-searchinput" />
            <span className="toolbar-searchbutton">검색</span>
          </div>
        </div>

        <div className="posts">
          {posts &&
            posts.map((post: IPost, index) => {
              return (
                <div key={index} className="post">
                  <div className="post-main">
                    <div className="post-tags">
                      <span className="tag category">{board.title}</span>
                      <span className="tag">테스트</span>
                    </div>
                    <div className="post-title">
                      <Link href={`/post/${post.id}`}>
                        <a>{post.title}</a>
                      </Link>
                    </div>
                  </div>
                  <div className="post-likes">좋아요 수: 0</div>
                  <div className="post-comments">댓글 수: 0</div>
                  <div className="post-info">
                    <div className="post-author">{post.author?.username}</div>
                    <div className="post-date">
                      {dateFormat(post.createdAt)}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="paginator-wrapper">
          <div className="paginator">
            <div className="paginator-cell prev">prev</div>
            <div className="paginator-cell">1</div>
            <div className="paginator-cell">2</div>
            <div className="paginator-cell">3</div>
            <div className="paginator-cell">4</div>
            <div className="paginator-cell next">next</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .wrapper {
          padding: 0 40px;
          max-width: 1000px;
          margin: 50px auto;
        }

        .toolbar {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }
        .toolbar-search {
          border-radius: 5px;
          border: 1px solid #dddddd;
          font-size: 13px;
          overflow: hidden;
          display: flex;
        }
        .toolbar-searchinput {
          display: block;
          border: none;
          padding: 5px;
        }
        .toolbar-searchbutton {
          padding: 5px 20px;
          border-left: 1px solid #dddddd;
        }
        .toolbar-button {
          border-radius: 5px;
          border: 1px solid #dddddd;
          padding: 5px 20px;
          font-size: 13px;
        }
        .toolbar-button.newpost {
          background-color: var(--ansi-green);
          color: white;
        }

        .paginator-wrapper {
          display: flex;
          justify-content: center;
        }
        .paginator {
          border-radius: 5px;
          border: 1px solid #dddddd;
          display: flex;
        }
        .paginator-cell {
          padding: 5px 15px;
          border-right: 1px solid #dddddd;
        }
        .paginator-cell:last-child {
          border-right: none;
        }

        .posts {
          border: 1px solid #dddddd;
          border-radius: 5px;
          margin: 20px 0;
        }
        .post {
          padding: 10px;
          display: flex;
          align-items: center;
          border-bottom: 1px solid #dddddd;
        }
        .post-tags {
          margin-bottom: 5px;
        }
        .post-tags .tag {
          border-radius: 5px;
          padding: 1px 4px;
          border: 1px solid #dddddd;
          margin-right: 5px;
          font-size: 0.7rem;
        }
        .post-tags .tag.category {
          background-color: var(--ansi-cyan);
          color: white;
        }
        .post:last-child {
          border-bottom: none;
        }
        .post-main {
          flex: 1;
          font-size: 0.8rem;
        }
        .post-comments,
        .post-likes,
        .post-info {
          margin-left: 20px;
          font-size: 0.7rem;
        }
        .post-title {
          font-size: 0.9rem;
          font-weight: bold;
        }
        .post-content {
          font-size: 0.8rem;
        }
      `}</style>
    </>
  );
};

export default Board;
