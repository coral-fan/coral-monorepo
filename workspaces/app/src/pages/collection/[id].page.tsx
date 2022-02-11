import styled from '@emotion/styled';

interface NFTCollection {
  id: string;
  name: string;
  artist: string;
}

const Container = styled.div`
  display: flex;
`;

export default function User({ id }: NFTCollection) {
  return <Container>{`Collection ${id}`}</Container>;
}

interface NFTCollectionRouteParam {
  params: {
    id: string;
  };
}

const collectionIds = [1, 2, 3, 4, 5];
const paths = collectionIds.map((id) => ({ params: { id: `${id}` } }));

export const getStaticPaths = async () => {
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }: NFTCollectionRouteParam) => {
  return {
    props: { id: params.id },
  };
};
