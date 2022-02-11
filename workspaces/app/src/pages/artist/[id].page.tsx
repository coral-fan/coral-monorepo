import styled from '@emotion/styled';

interface Artist {
  id: string;
}

const Container = styled.div`
  display: flex;
`;

export default function Artist({ id }: Artist) {
  return <Container>{`Artist ${id}`}</Container>;
}

interface ArtistRouteParam {
  params: {
    id: string;
  };
}

const artistIds = [1, 2, 3, 4, 5];
const artists: Artist[] = artistIds.map((id) => ({ id: `${id}` }));
const paths = artists.map(({ id }) => ({ params: { id: `${id}` } }));

export const getStaticPaths = async () => {
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }: ArtistRouteParam) => {
  return {
    props: { id: params.id },
  };
};
