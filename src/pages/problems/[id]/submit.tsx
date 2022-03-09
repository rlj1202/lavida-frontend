import Head from 'next/head'
import { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query

  return {
    props: {
      id
    }
  }
}

const Submit: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ id }) => {
  return (
    <>
      <Head>
        <title>{`${id}`}</title>
      </Head>

      <div>
        test
      </div>

      <style jsx>{`

      `}</style>
    </>
  )
}

export default Submit
