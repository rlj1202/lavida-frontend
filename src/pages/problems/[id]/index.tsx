import Head from 'next/head';
import {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next';

import Config from '../../../config';
import DefaultWrapper from '../../../components/defaultWrapper';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  return {
    props: {
      id,
      title: 'Title',
    },
  };
};

const Problem: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ id, title }) => {
  return (
    <>
      <Head>
        <title>{`${Config.title}`}</title>
      </Head>

      <DefaultWrapper>
        <h1>{`${title} #${id}`}</h1>
        <div>시간제한 얼마 메모리제한 얼마</div>
        <button>제출</button>
        <h2>설명</h2>
        여기에 설명을 적는다.
        <h2>입력</h2>
        여기에 입력에 대한 설명을 적는다.
        <h2>출력</h2>
        여기에 출력에 대한 설명을 적는다.
        <h2>예제 입력</h2>
        <code>test</code>
        <h2>예제 출력</h2>
        <code>test</code>
        <h2>힌트</h2>
        힌트는 없다.
        <h2>출처</h2>
        출처는 없다.
      </DefaultWrapper>

      <style jsx>{``}</style>
    </>
  );
};

export default Problem;
