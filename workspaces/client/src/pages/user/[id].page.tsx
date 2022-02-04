import styled from '@emotion/styled';
import { User } from 'libraries/models';
import { getServerSidePropsFactory } from '../utils/ssr';

const Container = styled.div`
  display: flex;
`;

export default function UserPage({ user }: { user: User }) {
  return <Container>{`${user.username}'s Profile`}</Container>;
}

export const getServerSideProps = getServerSidePropsFactory('id', 'users');
