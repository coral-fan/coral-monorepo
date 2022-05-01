import styled from '@emotion/styled';
import { useCallback, useMemo } from 'react';
import { GetServerSideProps } from 'next';

import { Asset, Collection } from 'libraries/models';
import { Layout as AssetLayout } from 'components/ui/nft';
import { Owner } from './components';
import { getGatedContentComponent } from 'components/ui/nft/GatedContent/utils';
import { useIsMobile } from 'libraries/window';
import tokens, { QUERY } from 'styles/tokens';
import { SERVER_ENVIRONMENT } from 'consts';
import { getAsset } from 'libraries/models/asset/utils';

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
  //  TODO: remove conditional return for sign up campaign
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

  const { collectionId, assetId } = params;

  const assetData = await getAsset(collectionId, parseInt(assetId));

  if (!assetData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      assetData,
    },
  };
};
