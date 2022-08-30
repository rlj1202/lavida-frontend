import Head from 'next/head';
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';

import Config from '../../config';
import DefaultWrapper from '../../components/defaultWrapper';

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

      <DefaultWrapper>
        <div>test</div>
      </DefaultWrapper>

      <style jsx>{``}</style>
    </>
  );
};

export default Problems;
