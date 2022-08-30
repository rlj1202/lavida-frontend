import axios from 'axios';
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import Head from 'next/head';
import DefaultWrapper from '../../../components/defaultWrapper';
import Config from '../../../config';
import IUser from '../../../interfaces/IUser';

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

      <DefaultWrapper>{user.username}</DefaultWrapper>

      <style jsx>{``}</style>
    </>
  );
};

export default UserPage;
