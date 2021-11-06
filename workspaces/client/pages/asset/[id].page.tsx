import { Flex } from 'components/layout';

interface NFTAsset {
  id: string;
  name: string;
  artist: string;
}

export default function User({ id }: NFTAsset) {
  return <Flex>{`Asset ${id}`}</Flex>;
}

interface NFTAssetRouteParam {
  params: {
    id: string;
  };
}

const assetIds = [1, 2, 3, 4, 5];
const paths = assetIds.map((id) => ({ params: { id: `${id}` } }));

export const getStaticPaths = async () => {
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }: NFTAssetRouteParam) => {
  return {
    props: { id: params.id },
  };
};
