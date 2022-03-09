import { Card } from 'components/ui';
import { BaseInfo } from 'components/ui/nft';
import { Asset } from 'libraries/models';

type NFTAssetProps = Asset;

export const NftAsset = ({
  id,
  imageUrl,
  artistName,
  artistProfilePhoto,
  collectionName,
  collectionDescription,
}: NFTAssetProps) => (
  <>
    <Card>
      <BaseInfo
        title={collectionName}
        titleHeadingLevel={1}
        imageUrl={imageUrl}
        artistName={artistName}
        artistProfilePhoto={artistProfilePhoto}
        description={collectionDescription}
      >
        {id}
      </BaseInfo>
    </Card>
  </>
);
