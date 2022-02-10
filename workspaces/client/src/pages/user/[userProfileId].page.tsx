import styled from '@emotion/styled';
import { PrivateUserData, PublicUserData, User, useUserUid } from 'libraries/models';
import { GetServerSideProps } from 'next';
import { getDocumentData } from 'libraries/firebase';
import { getUidServerSide } from 'pages/utils';
import { useState } from 'react';
import { UpdateUser } from './components/UpdateUser';

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
        <UpdateUser {...{ username, email, profilePhoto, setUser }} />
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

  const authenticatedUserUid = await getUidServerSide(context);

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
