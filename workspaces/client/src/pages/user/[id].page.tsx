import styled from '@emotion/styled';

interface User {
  id: string;
  username: string;
}

const Container = styled.div`
  display: flex;
`;

export default function User({ username }: User) {
  return <Container>{`${username}'s Profile`}</Container>;
}

interface UserRouteParam {
  params: {
    id: string;
  };
}

const userIds = [1, 2, 3, 4, 5];
const users: User[] = userIds.map((id) => ({ id: `${id}`, username: `username_${id}` }));
const paths = users.map(({ id }) => ({ params: { id: `${id}` } }));

export const getStaticPaths = async () => {
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }: UserRouteParam) => {
  return {
    props: { id: params.id, username: users.find((user) => user.id === params.id)?.username },
  };
};
