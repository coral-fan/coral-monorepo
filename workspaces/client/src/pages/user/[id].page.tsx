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
  uid: string;
  user: User;
}

export default function UserPage({ uid, user }: UserPageProps) {
  const { email, username, profilePhoto } = user;

  const userUid = useUserUid();

  return (
    <Container>
      {`${user.username}'s Profile`}
      {uid === userUid && email !== undefined && (
        <UpdateUser {...{ email, username, profilePhoto }} />
      )}
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<UserPageProps, { id: string }> = async (
  context
) => {
  const { params } = context;

  if (params === undefined) {
    return {
      notFound: true,
    };
  }

  const { id } = params;
  const publicUserData = await getDocumentData<PublicUserData>('users', id);

  if (publicUserData === undefined) {
    return {
      notFound: true,
    };
  }

  const uid = await getUidServerSide(context);
  const privateUserData =
    uid === id ? await getDocumentData<PrivateUserData>('users', id, 'private', 'data') : undefined;
  const user: User = { ...publicUserData, ...privateUserData };
  return {
    props: {
      uid: id,
      user,
    },
  };
};
