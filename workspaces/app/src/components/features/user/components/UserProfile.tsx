import styled from '@emotion/styled';
import { useUserUid } from 'libraries/models';
import { UpdateProfile } from './UpdateProfile';
import { useRouter } from 'next/router';
import { useUser } from '../hooks';
import { Avatar } from 'components/ui';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserProfile = () => {
  const { userProfileId } = useRouter().query;

  if (typeof userProfileId !== 'string') {
    throw Error('userProfileId must be of type string');
  }

  const [{ username, email, profilePhoto }] = useUser();

  const currentUserUid = useUserUid();

  return (
    <Container>
      {`${username}'s Profile`}
      <Avatar size={200} {...profilePhoto} />
      {currentUserUid === userProfileId && email !== undefined && <UpdateProfile />}
    </Container>
  );
};
