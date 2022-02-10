import styled from '@emotion/styled';
import { PrivateUserData, PublicUserData, User, useUserUid } from 'libraries/models';
import { Button } from 'components/ui';
import { UpdateUserModal } from './components/EditUserModal/UpdateProfileModal';
import { useState } from 'react';
import { UpdateUserProps } from './components/EditUserModal/types';
import { GetServerSideProps } from 'next';
import { getDocumentData } from 'libraries/firebase';
import { getUidServerSide } from 'pages/utils';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const UpdateUser = (props: UpdateUserProps) => {
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsEditUserModalOpen(true)}>Update Profile</Button>
      {isEditUserModalOpen ? (
        <UpdateUserModal {...props} setIsModalOpen={setIsEditUserModalOpen} />
      ) : null}
    </>
  );
};

interface UserPageProps {
  userProfileId: string;
  userData: User;
}

export default function UserPage({ userData, userProfileId }: UserPageProps) {
  const { username, email, profilePhoto } = userData;

  const currentUserUid = useUserUid();

  return (
    <Container>
      {`${username}'s Profile`}
      {currentUserUid === userProfileId && email !== undefined && (
        <UpdateUser {...{ username, email, profilePhoto }} />
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
