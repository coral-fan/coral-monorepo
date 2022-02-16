import styled from '@emotion/styled';
import { PrivateUserData, PublicUserData, User, useUserUid } from 'libraries/models';
import { GetServerSideProps } from 'next';
import { getDocumentData } from 'libraries/firebase';
import { UpdateProfile } from './components/UpdateProfile/UpdateProfile';
import { getIdToken } from 'libraries/authentication';
import { destroyCookie } from 'nookies';
import { ID_TOKEN_KEY } from 'consts';
import { getAuthenticationServerSide } from 'libraries/firebase/authentication';
import { UserPageProvider } from './provider';
import { useRouter } from 'next/router';
import { useUser } from './hooks';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

interface UserPageProps {
  userData: User;
}

const UserProfile = () => {
  const { userProfileId } = useRouter().query;

  if (typeof userProfileId !== 'string') {
    throw Error('userProfileId must be of type string');
  }

  const [{ username, email }] = useUser();
  const currentUserUid = useUserUid();

  return (
    <Container>
      {`${username}'s Profile`}
      {currentUserUid === userProfileId && email !== undefined && <UpdateProfile />}
    </Container>
  );
};
export default function UserPage({ userData }: UserPageProps) {
  return (
    <UserPageProvider initialUserData={userData}>
      <UserProfile />
    </UserPageProvider>
  );
}

export const getServerSideProps: GetServerSideProps<
  UserPageProps,
  { userProfileId: string }
> = async (context) => {
  const { params } = context;

  if (params === undefined) {
    return {
      notFound: true,
    };
  }

  const { userProfileId } = params;
  const publicUserData = await getDocumentData<PublicUserData>('users', userProfileId);

  if (publicUserData === undefined) {
    return {
      notFound: true,
    };
  }

  const auth = await getAuthenticationServerSide();

  const token = getIdToken(context);

  const authenticatedUserUid =
    token === null
      ? undefined
      : (
          await auth.verifyIdToken(token).catch(() => {
            destroyCookie(context, ID_TOKEN_KEY);
          })
        )?.uid;

  const privateUserData =
    authenticatedUserUid === userProfileId
      ? await getDocumentData<PrivateUserData>('users', userProfileId, 'private', 'data')
      : undefined;

  const userData: User = { ...publicUserData, ...privateUserData };

  return {
    props: {
      userData,
    },
  };
};
