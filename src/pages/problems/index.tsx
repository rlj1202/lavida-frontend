import Head from 'next/head';
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';

import Config from '../../config';

interface Props {}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {},
  };
};

const Problems: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({}) => {
  return (
    <>
      <Head>
        <title>{`${Config.title} - Problems`}</title>
      </Head>

      <div>test</div>

      <style jsx>{``}</style>
    </>
  );
};

export default Problems;
