import { Owner } from 'components/features/asset/components';
import { getBadge } from 'components/ui/badges/utils';
import {
  AssetContentContainer,
  Details,
  GatedContentWrapper,
  ImageWithInfo,
  ImageWrapper,
  NftAssetContainer,
  NftContent,
} from 'components/ui/nft';
import { getGatedContentComponent } from 'components/ui/nft/GatedContent/utils';
import { Asset, Collection } from 'libraries/models';
import { useIsMobile } from 'libraries/window';
import { useCallback, useMemo } from 'react';

type PaymentSuccessProps = Asset & Collection;

export const PaymentSuccess = ({
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
}: PaymentSuccessProps) => {
  const isMobile = useIsMobile();
  const Badge = getBadge(type);

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

  const image = useMemo(
    () => (
      <ImageWrapper isAsset={true}>
        <ImageWithInfo
          imageUrl={imageUrl}
          artistName={artistName}
          artistProfilePhoto={artistProfilePhoto}
          artistId={artistId}
          isCard={false}
        />
      </ImageWrapper>
    ),
    [imageUrl, artistName, artistProfilePhoto, artistId]
  );

  return (
    <>
      <NftAssetContainer isAsset={true}>
        {isMobile && image}
        <AssetContentContainer isAsset={true}>
          <NftContent
            title={collectionName}
            titleHeadingLevel={2}
            titleStyleVariant={'h1'}
            Badge={Badge}
            isCard={false}
          />
          {owner}
        </AssetContentContainer>
      </NftAssetContainer>
      <GatedContentWrapper>{gatedContentComponent}</GatedContentWrapper>
      {collectionDetails && <Details details={collectionDetails} />}
    </>
  );
};
