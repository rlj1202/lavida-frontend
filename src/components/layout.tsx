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

      <div className="wrapper">{children}</div>

      <Footer />

      <style jsx>{`
        .wrapper {
          padding: 0 40px;
          max-width: 1000px;
          margin: 0 auto;
        }
      `}</style>
    </>
  );
};

export default Layout;
