import { NextPage } from 'next';
import Head from 'next/head';
import DefaultWrapper from '../components/defaultWrapper';
import Config from '../config';

const Tools: NextPage = () => {
  return (
    <>
      <Head>
        <title>{`${Config.title} - Tools`}</title>
      </Head>

      <DefaultWrapper>
        <div>Tools</div>
      </DefaultWrapper>
    </>
  );
};

export default Tools;
