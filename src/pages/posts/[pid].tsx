import Link from 'next/link';
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';

import dateFormat from 'dateformat';

import IArticle from '../../interfaces/IArticle';
import IUser from '../../interfaces/IUser';

import Config from '../../config';
import Head from 'next/head';
import axios from 'axios';
import { FormEvent, useState } from 'react';
import DefaultWrapper from '../../components/defaultWrapper';
import IComment from '../../interfaces/IComment';
import { useRouter } from 'next/router';

interface Props {
  user: IUser | null;
  article: IArticle;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context,
) => {
  const { pid } = context.query;

  const { data: article } = await axios.get<IArticle>(
    `${process.env.API_HOST}/api/articles/${pid}`,
  );

  const user = await axios
    .post<IUser | null>(
      `${process.env.API_HOST}/api/auth/userinfo`,
      undefined,
      {
        headers: {
          Authorization: `Bearer ${context.req.cookies['access_token']}`,
        },
      },
    )
    .then((response) => response.data)
    .catch((err) => null);

  return {
    props: {
      user: user,
      article: article,
    },
  };
};

const Post: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ user, article }) => {
  const router = useRouter();
  const { pid } = router.query;

  const [commentContent, setCommentContent] = useState<string>('');

  const doAddComment = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await axios.post<IComment>(
      `/api/comments`,
      {
        content: commentContent,
      },
      {
        params: { article: pid },
      },
    );

    router.reload();
  };

  return (
    <>
      <Head>
        <title>{`${Config.title} - post`}</title>
      </Head>

      <DefaultWrapper>
        <div className="postid">#{article?.id}</div>
        <div className="author">{article?.author?.username}가 작성</div>
        <div className="date">
          {dateFormat(article?.createdAt)}에 작성됨 ·{' '}
          {dateFormat(article?.updatedAt)}에 수정됨
        </div>
        <h1>{article?.title}</h1>
        <div className="content">{article?.content}</div>

        <div className="comments">
          {article.comments &&
            article.comments.map((comment) => (
              <div className="comment" key={comment.id}>
                <div className="comment-author">{comment.author?.username}</div>
                <div className="comment-date">
                  {dateFormat(comment.createdAt)}에 작성됨
                </div>
                <div className="comment-content">{comment.content}</div>
                <div className="comment-buttons">
                  <button className="comment-button" onClick={() => {}}>
                    수정
                  </button>
                  <button className="comment-button" onClick={() => {}}>
                    삭제
                  </button>
                  <button className="comment-button" onClick={() => {}}>
                    답글
                  </button>
                </div>
              </div>
            ))}
          {user && (
            <>
              <div className="comment">
                <form onSubmit={doAddComment}>
                  <textarea
                    className="comment-input"
                    name="content"
                    value={commentContent}
                    onChange={(event) => setCommentContent(event.target.value)}
                  ></textarea>
                  <button type="submit" className="comment-submit">
                    댓글 쓰기
                  </button>
                </form>
              </div>
            </>
          )}
          {!user && (
            <>
              <div className="comment unable-to-comment">
                댓글을 작성하려면{' '}
                <Link href="/login">
                  <a className="comment-login">로그인</a>
                </Link>
                하세요.
              </div>
            </>
          )}
        </div>
      </DefaultWrapper>

      <style jsx>{`
        .author,
        .date,
        .postid {
          font-size: 0.8rem;
          color: gray;
        }

        .comments {
          border-radius: 5px;
          border: 1px solid #dddddd;
          margin: 20px 0;
        }
        .comment {
          padding: 10px;
          border-bottom: 1px solid #dddddd;
        }
        .comment-author {
          font-size: 0.9rem;
        }
        .comment-date {
          color: gray;
          font-size: 0.8rem;
        }
        .comment:last-child {
          border-bottom: none;
        }
        .comment-content {
          margin: 5px 0;
        }
        .comment-button {
          font-size: 0.7rem;
          margin-right: 5px;
          background: transparent;
          border: none;
          padding: 0;
        }
        .comment-input {
          border: 1px solid #dddddd;
          border-radius: 5px;
          display: block;
          width: 100%;
          margin-bottom: 10px;
          resize: vertical;
          min-height: 100px;
        }
        .comment-submit {
          display: block;
          border-radius: 5px;
          border: 1px solid #dddddd;
          padding: 5px 20px;
        }
        .comment.unable-to-comment {
          text-align: center;
          font-size: 0.8rem;
          color: gray;
        }
        .comment-login {
          text-decoration: underline;
        }
      `}</style>
    </>
  );
};

export default Post;
