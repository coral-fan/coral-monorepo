import styled from '@emotion/styled';
import { User } from 'libraries/models';
import { getServerSidePropsFactory } from '../utils/ssr';
import { Button } from 'components/ui';
import { EditUserModal } from './components/EditUserModal/EditUserModal';
import { useState } from 'react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function UserPage({ user }: { user: User }) {
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const { email, username, profilePhoto } = user;

  return (
    <Container>
      {`${user.username}'s Profile`}
      <Button onClick={() => setIsEditUserModalOpen(true)}>Update Profile</Button>
      {isEditUserModalOpen ? (
        <EditUserModal
          email={email}
          username={username}
          profilePhoto={profilePhoto}
          setIsModalOpen={setIsEditUserModalOpen}
        />
      ) : null}
    </Container>
  );
}

export const getServerSideProps = getServerSidePropsFactory('id', 'users');
