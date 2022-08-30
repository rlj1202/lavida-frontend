import { NextPage } from 'next';
import Head from 'next/head';
import DefaultWrapper from '../components/defaultWrapper';
import Config from '../config';

const Status: NextPage = () => {
  return (
    <>
      <Head>
        <title>{`${Config.title} - Status`}</title>
      </Head>

      <DefaultWrapper>
        <div>Status</div>
      </DefaultWrapper>
    </>
  );
};

export default Status;
