import Head from 'next/head';
import { NextPage } from 'next';

import Topbar from './topbar';
import Footer from './footer';

import Config from '../config';

const Layout: NextPage = ({ children }) => {
  return (
    <>
      <Head>
        <title>{Config.title}</title>
      </Head>

      <Topbar />

      {children}

      <Footer />

      <style jsx>{``}</style>
    </>
  );
};

export default Layout;
