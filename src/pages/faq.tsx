import { NextPage } from 'next';
import Head from 'next/head';
import DefaultWrapper from '../components/defaultWrapper';
import Config from '../config';

const Faq: NextPage = () => {
  return (
    <>
      <Head>
        <title>{`${Config.title} - FAQ`}</title>
      </Head>

      <DefaultWrapper>
        <div>FAQ</div>
      </DefaultWrapper>
    </>
  );
};

export default Faq;
