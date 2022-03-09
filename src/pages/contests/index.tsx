import Head from 'next/head'
import { NextPage } from 'next'

import Config from '../../config'

const Contests: NextPage = ({}) => {
  return (
    <>
      <Head>
        <title>{`${Config.title} - Contests`}</title>
      </Head>

      <style jsx>{`
      `}</style>
    </>
  )
}

export default Contests
