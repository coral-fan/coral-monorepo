import styled from '@emotion/styled';
import { ButtonLink, Heading } from 'components/ui';
import { ImageWithInfo, NftAssetContainer } from 'components/ui/nft';
import { Asset } from 'libraries/models';
import { useMemo } from 'react';
import tokens from 'styles/tokens';

interface PaymentSuccessProps
  extends Pick<
    Asset,
    'imageUrl' | 'creatorName' | 'creatorProfilePhoto' | 'artistId' | 'collectionName'
  > {
  collectionId: string;
  assetId: number;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const AssetInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px;
  background-color: ${tokens.background.color.tertiary};
  gap: 16px;
`;

const AssetInfoBottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const PaymentSuccess = ({
  imageUrl,
  creatorName,
  creatorProfilePhoto,
  artistId,
  assetId,
  collectionId,
  collectionName,
}: PaymentSuccessProps) => {
  const image = useMemo(
    () => (
      <ImageWithInfo
        imageUrl={imageUrl}
        creatorName={creatorName}
        creatorProfilePhoto={creatorProfilePhoto}
        artistId={artistId}
        isCard={true}
      />
    ),
    [imageUrl, creatorName, creatorProfilePhoto, artistId]
  );

  return (
    <Container>
      <NftAssetContainer isAsset={true}>
        {image}
        <AssetInfoContainer>
          <Heading level={2} styleVariant={'h3'}>
            {collectionName}
          </Heading>
          <AssetInfoBottom>
            <Heading level={3} styleVariant={'h4'}>
              #{assetId}
            </Heading>
          </AssetInfoBottom>
        </AssetInfoContainer>
      </NftAssetContainer>
      <ButtonLink href={`/collection/${collectionId}/asset/${assetId}`}>View Your NFT</ButtonLink>
    </Container>
  );
};
