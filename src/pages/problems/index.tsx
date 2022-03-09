import Head from 'next/head'
import { NextPage } from 'next'

import Config from '../../config'

const Problems: NextPage = ({}) => {
  return (
    <>
      <Head>
        <title>{`${Config.title} - Problems`}</title>
      </Head>

      <div>
        test
      </div>

      <style jsx>{`
      `}</style>
    </>
  )
}

export default Problems
