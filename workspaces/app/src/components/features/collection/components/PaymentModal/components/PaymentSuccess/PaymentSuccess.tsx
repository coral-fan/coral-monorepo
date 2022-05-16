import styled from '@emotion/styled';
import { Owner } from 'components/features/asset/components';
import { ButtonLink } from 'components/ui';
import { getBadge } from 'components/ui/badges/utils';
import {
  AssetContentContainer,
  ImageWithInfo,
  NftAssetContainer,
  NftContent,
} from 'components/ui/nft';
import { Asset } from 'libraries/models';
import { useMemo } from 'react';

interface PaymentSuccessProps
  extends Omit<Asset, 'id' | 'contractAddress' | 'collectionDescription'> {
  collectionId: string;
  assetId: number;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const PaymentSuccess = ({
  imageUrl,
  artistName,
  artistProfilePhoto,
  artistId,
  assetId,
  collectionId,
  collectionName,
  type,
  ownerAddress,
  ownerProfilePhoto,
  ownerUsername,
  ownerType,
}: PaymentSuccessProps) => {
  const Badge = getBadge(type);

  const owner = useMemo(
    () => (
      <Owner
        userId={ownerAddress}
        assetId={assetId}
        profilePhoto={ownerProfilePhoto}
        username={ownerUsername}
        type={ownerType}
      />
    ),
    [ownerAddress, assetId, ownerProfilePhoto, ownerUsername, ownerType]
  );

  const image = useMemo(
    () => (
      <ImageWithInfo
        imageUrl={imageUrl}
        artistName={artistName}
        artistProfilePhoto={artistProfilePhoto}
        artistId={artistId}
        isCard={true}
      />
    ),
    [imageUrl, artistName, artistProfilePhoto, artistId]
  );

  return (
    <Container>
      <NftAssetContainer isAsset={true}>
        {image}
        <AssetContentContainer isAsset={true} isPurchaseSuccess={true}>
          <NftContent
            title={collectionName}
            titleHeadingLevel={2}
            titleStyleVariant={'h2'}
            Badge={Badge}
            isCard={false}
          />
          {owner}
        </AssetContentContainer>
      </NftAssetContainer>
      <ButtonLink href={`/collection/${collectionId}/asset/${assetId}`}>View Your NFT</ButtonLink>
    </Container>
  );
};
