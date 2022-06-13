import styled from '@emotion/styled';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next';

import { Asset, useUserUid } from 'libraries/models';
import { Layout as AssetLayout } from 'components/ui/nft';
import { Owner } from './components';
import { getGatedContentComponent } from 'components/ui/nft/GatedContent/utils';
import { useIsMobile } from 'libraries/window';
import tokens, { QUERY } from 'styles/tokens';
import { getAsset } from 'libraries/models/asset/utils';
import { NextParsedUrlQuery } from 'next/dist/server/request-meta';
import { getTokenOwner$ } from 'libraries/blockchain/observables';
import { map } from 'rxjs';

type AssetPageProps = Asset;

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

  const currentUserId = useUserUid();
  const [isCurrentUserOwner, setIsCurrentUserOwner] = useState(currentUserId === ownerAddress);

  useEffect(() => {
    const subscription = getTokenOwner$(contractAddress, id)
      .pipe(map((tokenOwner) => tokenOwner === currentUserId))
      .subscribe(setIsCurrentUserOwner);

    return () => subscription.unsubscribe();
  }, [contractAddress, id, currentUserId]);

  const gatedContentElement = useMemo(
    () => (isCurrentUserOwner ? getGatedContentComponent(gatedContent) : null),
    [isCurrentUserOwner, gatedContent]
  );

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
        gatedContentElement={gatedContentElement}
        owner={owner}
      />
    </AssetContainer>
  );
};

interface AssetParams extends NextParsedUrlQuery {
  collectionId: string;
  assetId: string;
}

export const getServerSideProps: GetServerSideProps<AssetPageProps, AssetParams> = async (
  context
) => {
  const { params } = context;

  if (params === undefined) {
    return {
      notFound: true,
    };
  }

  const { collectionId, assetId } = params;

  try {
    // getAsset can throw an exception get tokenId doesn't exist yet in smart contract
    const assetData = await getAsset(collectionId, parseInt(assetId));
    return {
      props: {
        ...assetData,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};
