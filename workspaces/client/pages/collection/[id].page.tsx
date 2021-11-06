import { Flex } from 'components/layout';

interface NFTCollection {
  id: string;
  name: string;
  artist: string;
}

export default function User({ id }: NFTCollection) {
  return <Flex>{`Collection ${id}`}</Flex>;
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
