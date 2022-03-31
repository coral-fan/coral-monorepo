import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Card } from 'components/ui';
import { getBadge } from 'components/ui/badges/utils';
import { BaseInfo } from 'components/ui/nft';
import { Asset, GatedContent } from 'libraries/models';
import { EventLink, ContentLink, Owner } from './components';

type NFTAssetProps = Omit<Asset, 'collectionDetails'>;

type ContainerProps = Pick<NFTAssetProps, 'gatedContent'>;

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${({ gatedContent }) =>
    gatedContent?.type === 'url'
      ? css`
          gap: 16px;
        `
      : null}
`;

const getGatedContentComponent = (gatedContent: GatedContent) => {
  if (gatedContent !== null) {
    switch (gatedContent.type) {
      case 'event':
        return <EventLink eventId={gatedContent.id}></EventLink>;
      case 'url':
        return <ContentLink url={gatedContent.url} />;
    }
  }
  return null;
};

export const NftAsset = ({
  id,
  collectionName,
  imageUrl,
  type,
  gatedContent,
  artistName,
  artistProfilePhoto,
  collectionDescription,
  ownerUsername,
  ownerType,
  ownerAddress,
  ownerProfilePhoto,
}: NFTAssetProps) => {
  return (
    <Container gatedContent={gatedContent}>
      <Card>
        <BaseInfo
          title={collectionName}
          titleHeadingLevel={1}
          titleStyleVariant={'h2'}
          imageUrl={imageUrl}
          artistName={artistName}
          artistProfilePhoto={artistProfilePhoto}
          Badge={getBadge(type)}
          description={collectionDescription}
          isCard={false}
        >
          <Owner
            userId={ownerAddress}
            assetId={id}
            profilePhoto={ownerProfilePhoto}
            username={ownerUsername}
            type={ownerType}
          />
        </BaseInfo>
      </Card>
      {getGatedContentComponent(gatedContent)}
    </Container>
  );
};
