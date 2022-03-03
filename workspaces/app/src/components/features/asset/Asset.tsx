import styled from '@emotion/styled';
import { Asset } from 'libraries/models';
import { GetServerSideProps } from 'next';

const Container = styled.div`
  display: flex;
`;

interface AssetPageProps {
  assetData: Asset;
}

export const AssetPage = ({ assetData }: AssetPageProps) => {
  return <Container>{`Asset ${assetData.id}`}</Container>;
};

export const getServerSideProps: GetServerSideProps<AssetPageProps, { assetId: string }> = async (
  context
) => {
  const { params } = context;

  if (params === undefined) {
    return {
      notFound: true,
    };
  }

  const { assetId } = params;

  // Make database call with assetId to get assetData.
  const assetData: Asset = {
    id: 1,
    collectionId: '0x123456789',
    userId: 2,
  };

  return {
    props: {
      assetData,
    },
  };
};
