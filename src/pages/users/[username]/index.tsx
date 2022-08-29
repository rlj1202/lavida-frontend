import axios from 'axios';
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import Head from 'next/head';
import Config from '../../../config';
import { IUser } from '../../../interfaces/IUser';

interface Props {
  user: IUser;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context,
) => {
  const { username } = context.query;

  const response = await axios.get<IUser>(
    `${process.env.API_HOST}/api/users/${username}`,
  );

  return {
    props: {
      user: response.data,
    },
  };
};

const UserPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ user }) => {
  return (
    <>
      <Head>
        <title>{`${Config.title} - user`}</title>
      </Head>

      <div className="wrapper">{user.username}</div>

      <style jsx>{`
        .wrapper {
          padding: 0 40px;
          max-width: 1000px;
          margin: 50px auto;
        }
      `}</style>
    </>
  );
};

export default UserPage;
