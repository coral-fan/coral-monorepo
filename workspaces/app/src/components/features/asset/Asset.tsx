import styled from '@emotion/styled';
import { IMAGE_WITH_INFO_DEFAULT_ARGS } from 'components/ui/nft/components/ImageWithInfo/consts';
import { DEFAULT_PROFILE_PHOTO } from 'components/ui/profile/Avatar/consts';
import { Asset, AssetData } from 'libraries/models';
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
  const { collectionId }: AssetData = {
    id: parseInt(assetId),
    collectionId: '0x123456789',
  };

  const assetData: Asset = {
    id: 1,
    type: 'event',
    gatedContent: {
      type: 'event',
      id: '0x123456789',
    },
    collectionId: collectionId,
    collectionName: 'Behind the Scenes Studio Tour',
    collectionDescription:
      'Exclusive access to a one on one call with me between recording sessions on my next album. With this token you’ll get 30 minutes of solo time with me and the band.',
    collectionDetails: [
      'A personal call between just you and Bonobo',
      'Available any time before March 1st, 2022',
      "Accessible by Zoom after you've torn the ticket",
    ],
    ownerUsername: 'User123',
    ownerAddress: '0x123456789',
    ownerType: 'super_fan',
    ownerProfilePhoto: DEFAULT_PROFILE_PHOTO,
    ...IMAGE_WITH_INFO_DEFAULT_ARGS,
  };

  return {
    props: {
      assetData,
    },
  };
};
