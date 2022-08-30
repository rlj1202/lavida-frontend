import Head from 'next/head';
import Link from 'next/link';

import IBoard from '../../interfaces/IBoard';

import Config from '../../config';
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import axios from 'axios';
import DefaultWrapper from '../../components/defaultWrapper';

interface Props {
  boards: IBoard[];
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const response = await axios.get<IBoard[]>(
    `${process.env.API_HOST}/api/boards`,
  );

  return {
    props: {
      boards: response.data,
    },
  };
};

const BoardMain: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ boards }) => {
  return (
    <>
      <Head>
        <title>{`${Config.title} - Forum`}</title>
      </Head>

      <DefaultWrapper>
        <h1>포럼</h1>
        <div className="boards">
          {boards &&
            boards.map((board) => (
              <div className="board">
                <div className="board-title">
                  <Link href={`/boards/${board.slug}`}>
                    <a>{board.title}</a>
                  </Link>
                </div>
                <div className="board-description">{board.description}</div>
              </div>
            ))}
        </div>
      </DefaultWrapper>

      <style jsx>{`
        .boards {
          border: 1px solid #dddddd;
          border-radius: 5px;
        }
        .board {
          padding: 10px;
          border-bottom: 1px solid #dddddd;
        }
        .board:last-child {
          border-bottom: none;
        }
        .board-title {
          font-weight: bold;
          font-size: 1rem;
          margin-bottom: 5px;
        }
        .board-description {
          font-size: 0.9rem;
        }
      `}</style>
    </>
  );
};

export default BoardMain;
