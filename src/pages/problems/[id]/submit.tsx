import Head from 'next/head';
import {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next';
import DefaultWrapper from '../../../components/defaultWrapper';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  return {
    props: {
      id,
    },
  };
};

const Submit: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ id }) => {
  return (
    <>
      <Head>
        <title>{`${id}`}</title>
      </Head>

      <DefaultWrapper>test</DefaultWrapper>

      <style jsx>{``}</style>
    </>
  );
};

export default Submit;
