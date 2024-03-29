import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { doCreateArticle } from '../../../api/articles';
import { doGetBoard } from '../../../api/boards';
import DefaultWrapper from '../../../components/defaultWrapper';
import IBoard from '../../../interfaces/IBoard';

interface Props {
  board: IBoard;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context,
) => {
  const { bname } = context.query;

  if (typeof bname !== 'string') {
    return {
      notFound: true,
    };
  }

  const board = await doGetBoard(bname);

  return {
    props: {
      board,
    },
  };
};

const Create: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ board }) => {
  const router = useRouter();

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const handleCreateArticle = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await doCreateArticle(title, content, board.slug)
      .then(() => {
        router.back();
      })
      .catch((err) => {
        router.reload();
      });
  };

  return (
    <>
      <DefaultWrapper>
        <div>{board.title}</div>
        <h1>새 글 쓰기</h1>
        <form onSubmit={handleCreateArticle}>
          <label htmlFor="title">
            <h2>제목</h2>
          </label>
          <input
            id="title"
            name="title"
            className="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <label htmlFor="content">
            <h2>내용</h2>
          </label>
          <textarea
            id="content"
            name="content"
            className="content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          ></textarea>
          <button type="submit" className="submit">
            작성
          </button>
        </form>
      </DefaultWrapper>

      <style jsx>{`
        .title {
          display: block;
          width: 100%;
          margin: 20px 0;
          border-radius: 5px;
          border: 1px solid #dddddd;
          padding: 5px;
        }
        .content {
          display: block;
          width: 100%;
          margin: 20px 0;
          border-radius: 5px;
          border: 1px solid #dddddd;
          resize: vertical;
          min-height: 200px;
          padding: 5px;
        }
        .submit {
          border-radius: 5px;
          border: 1px solid #dddddd;
          padding: 5px 20px;
          float: right;
          clear: both;
        }
      `}</style>
    </>
  );
};

export default Create;
