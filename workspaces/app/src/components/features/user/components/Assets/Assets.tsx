import { getBadge } from 'components/ui/badges/utils';
import { Asset } from 'libraries/models';
import { ProfileItems } from 'components/ui';
import { ItemsPlaceholder, ProfileItemWrapper } from 'components/ui/profile';
import { AssetCard } from '../AssetCard';

interface AssetProps {
  assets: Asset[];
}

export const Assets = ({ assets }: AssetProps) => (
  <ProfileItems>
    {assets.length > 0 ? (
      assets.map((asset) => {
        const { type, id, contractAddress, collectionName } = asset;
        const Badge = getBadge(type);
        return (
          <ProfileItemWrapper key={`${contractAddress}-${id}`}>
            <AssetCard title={collectionName} Badge={Badge} {...asset} isCard={true} />
          </ProfileItemWrapper>
        );
      })
    ) : (
      <ItemsPlaceholder>Nothing collected yet.</ItemsPlaceholder>
    )}
  </ProfileItems>
);
