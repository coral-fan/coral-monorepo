import styled from '@emotion/styled';
import { PrivateUserData, PublicUserData, User, useUserUid } from 'libraries/models';
import { GetServerSideProps } from 'next';
import { getDocumentData, initializeFirebaseAdmin } from 'libraries/firebase';
import { useState } from 'react';
import { UpdateProfile } from './components/UpdateProfile/UpdateProfile';
import { getIdToken } from 'libraries/authentication';
import { destroyCookie } from 'nookies';
import { ID_TOKEN_KEY } from 'consts';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

interface UserPageProps {
  userProfileId: string;
  userData: User;
}

export default function UserPage({ userData, userProfileId }: UserPageProps) {
  const [user, setUser] = useState(userData);
  const { username, email, profilePhoto } = user;

  const currentUserUid = useUserUid();

  return (
    <Container>
      {`${username}'s Profile`}
      {currentUserUid === userProfileId && email !== undefined && (
        <UpdateProfile {...{ username, email, profilePhoto, setUser }} />
      )}
    </Container>
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

  await initializeFirebaseAdmin();

  const { getApp } = await import('firebase-admin/app');
  const app = getApp();

  const { getAuth } = await import('firebase-admin/auth');

  const token = getIdToken(context);

  const authenticatedUserUid =
    token === null
      ? undefined
      : (
          await getAuth(app)
            .verifyIdToken(token)
            .catch(() => {
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
      userProfileId,
      userData,
    },
  };
};
