import { Flex } from 'components/layout';

interface Artist {
  id: string;
}
export default function Artist({ id }: Artist) {
  return <Flex>{`Artist ${id}`}</Flex>;
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
