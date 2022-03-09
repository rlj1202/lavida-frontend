import { AppProps } from 'next/app'

import '../styles/globals.css'

import Layout from '../components/layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component className="top" {...pageProps} />
    </Layout>
  )
}

export default MyApp
