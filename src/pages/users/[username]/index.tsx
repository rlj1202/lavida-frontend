import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import Head from 'next/head';
import { doGetUser } from '../../../api/users';
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

  if (typeof username !== 'string') {
    return {
      notFound: true,
    };
  }

  const user = await doGetUser(username);

  return {
    props: {
      user,
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
