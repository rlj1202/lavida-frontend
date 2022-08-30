import Head from 'next/head';
import { NextPage } from 'next';

import Config from '../../config';
import DefaultWrapper from '../../components/defaultWrapper';

const Contests: NextPage = ({}) => {
  return (
    <>
      <Head>
        <title>{`${Config.title} - Contests`}</title>
      </Head>

      <DefaultWrapper></DefaultWrapper>

      <style jsx>{``}</style>
    </>
  );
};

export default Contests;
