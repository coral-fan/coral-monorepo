import { getBadge } from 'components/ui/badges/utils';
import { Asset } from 'libraries/models';
import { ProfileItems } from 'components/ui';
import { ProfileItemWrapper } from 'components/ui/profile';
import { AssetCard } from '../AssetCard';

interface AssetProps {
  assets: Asset[];
}

export const Assets = ({ assets }: AssetProps) => (
  <ProfileItems>
    {assets.map((asset) => {
      const { collectionName, artistName, artistProfilePhoto, imageUrl, type, id, collectionId } =
        asset;
      const Badge = getBadge(type);
      return (
        <ProfileItemWrapper key={id}>
          <AssetCard
            id={id}
            collectionId={collectionId}
            title={collectionName}
            Badge={Badge}
            imageUrl={imageUrl}
            artistName={artistName}
            artistProfilePhoto={artistProfilePhoto}
          />
        </ProfileItemWrapper>
      );
    })}
  </ProfileItems>
);
