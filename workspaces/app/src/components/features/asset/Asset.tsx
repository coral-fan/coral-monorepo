import styled from '@emotion/styled';
import { useCallback, useMemo } from 'react';
import { GetServerSideProps } from 'next';

import { IMAGE_WITH_INFO_DEFAULT_ARGS } from 'components/ui/nft/components/ImageWithInfo/consts';
import { DEFAULT_PROFILE_PHOTO } from 'components/ui/profile/Avatar/consts';
import { Asset, AssetData } from 'libraries/models';
import { Layout as AssetLayout } from 'components/ui/nft';
import { Owner } from './components';
import { getGatedContentComponent } from 'components/ui/nft/GatedContent/utils';
import { useIsMobile } from 'libraries/window';
import tokens, { QUERY } from 'styles/tokens';
import { SERVER_ENVIRONMENT } from 'consts';

interface AssetPageProps {
  assetData: Asset;
}

export const AssetIdWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: ${tokens.buttons.size.mobile};
  font-size: ${tokens.font.size.md};
  letter-spacing: ${tokens.font.letter_spacing.md};
  line-height: ${tokens.font.line_height.md};
`;

export const AssetContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: calc(-1.5 * ${tokens.buttons.size.mobile});
  gap: ${tokens.spacing.mobile.md};

  @media ${QUERY.TABLET} {
    margin-top: 0;
    gap: 0;
  }
`;

export const AssetPage = ({
  assetData: {
    imageUrl,
    artistName,
    artistProfilePhoto,
    artistId,
    collectionName,
    type,
    collectionDescription,
    collectionDetails,
    contractAddress,
    id,
    ownerAddress,
    ownerProfilePhoto,
    ownerUsername,
    ownerType,
    gatedContent,
  },
}: AssetPageProps) => {
  const owner = useMemo(
    () => (
      <Owner
        userId={ownerAddress}
        assetId={id}
        profilePhoto={ownerProfilePhoto}
        username={ownerUsername}
        type={ownerType}
      />
    ),
    [ownerAddress, id, ownerProfilePhoto, ownerUsername, ownerType]
  );

  const gatedContentComponent = useCallback(
    () => getGatedContentComponent(gatedContent),
    [gatedContent]
  )();

  const isMobile = useIsMobile();

  return (
    <AssetContainer>
      {isMobile && <AssetIdWrapper>#{id}</AssetIdWrapper>}
      <AssetLayout
        isAsset={true}
        type={type}
        imageUrl={imageUrl}
        artistName={artistName}
        artistProfilePhoto={artistProfilePhoto}
        artistId={artistId}
        name={collectionName}
        description={collectionDescription}
        details={collectionDetails}
        collectionId={contractAddress}
        gatedContent={gatedContentComponent}
        owner={owner}
      />
    </AssetContainer>
  );
};

export const getServerSideProps: GetServerSideProps<AssetPageProps, { assetId: string }> = async (
  context
) => {
  if (SERVER_ENVIRONMENT === 'production') {
    return {
      notFound: true,
    };
  }

  const { params } = context;

  if (params === undefined) {
    return {
      notFound: true,
    };
  }

  const { assetId } = params;

  // Make database call with assetId to get assetData.
  const { contractAddress }: AssetData = {
    id: parseInt(assetId),
    contractAddress: '0x123456789',
  };

  const assetData: Asset = {
    id: 1,
    type: 'event',
    gatedContent: {
      type: 'event',
      id: '0x123456789',
    },
    contractAddress,
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
