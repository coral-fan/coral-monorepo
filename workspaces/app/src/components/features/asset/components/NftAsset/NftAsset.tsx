import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { Card, EventBadge, MerchBadge, MusicBadge } from 'components/ui';
import { BaseInfo } from 'components/ui/nft';
import { Asset, CollectionType } from 'libraries/models';
import { Owner } from './components';

type NFTAssetProps = Asset;

const badgeMap: Record<CollectionType, () => EmotionJSX.Element> = {
  music: MusicBadge,
  event: EventBadge,
  merch: MerchBadge,
};

export const NftAsset = ({
  id,
  imageUrl,
  type,
  artistName,
  artistProfilePhoto,
  collectionName,
  collectionDescription,
  ownerUsername,
  ownerType,
  ownerProfilePhoto,
}: NFTAssetProps) => (
  <div>
    <Card>
      <BaseInfo
        title={collectionName}
        titleHeadingLevel={1}
        imageUrl={imageUrl}
        artistName={artistName}
        artistProfilePhoto={artistProfilePhoto}
        Badge={badgeMap[type]}
        description={collectionDescription}
      >
        <Owner
          assetId={id}
          profilePhoto={ownerProfilePhoto}
          username={ownerUsername}
          type={ownerType}
        />
      </BaseInfo>
    </Card>
  </div>
);
