import styled from '@emotion/styled';
import { User } from 'libraries/models';
import { getServerSidePropsFactory } from '../utils/ssr';
import { Button } from 'components/ui';
import { EditUserModal } from './components/EditUser/EditUserModal';
import { useState } from 'react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function UserPage({ user }: { user: User }) {
  const [isEditingUser, setIsEditingUser] = useState(false);
  const { email, username, profilePhoto } = user;

  return (
    <Container>
      {`${user.username}'s Profile`}
      <Button onClick={() => setIsEditingUser(true)}>Update Profile</Button>
      {isEditingUser ? (
        <EditUserModal
          email={email}
          username={username}
          profilePhoto={profilePhoto}
          showModal={setIsEditingUser}
        />
      ) : null}
    </Container>
  );
}

export const getServerSideProps = getServerSidePropsFactory('id', 'users');
