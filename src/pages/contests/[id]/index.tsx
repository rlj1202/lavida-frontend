import Head from 'next/head'
import { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next'

import Config from '../../../config'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query

  return {
    props: {
      id
    }
  }
}

const Contest: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ id }) => {
  return (
    <>
      <Head>
        <title>{`${Config.title} - Contests`}</title>
      </Head>

      <div>
        {id}
      </div>

      <style jsx>{`
      `}</style>
    </>
  )
}

export default Contest
