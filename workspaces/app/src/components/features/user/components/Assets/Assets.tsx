import { getBadge } from 'components/ui/badges/utils';
import { Asset } from 'libraries/models';
import { ProfileItems } from 'components/ui';
import { ItemsPlaceholder, ProfileItemWrapper } from 'components/ui/profile';
import { AssetCard } from '../AssetCard';

interface AssetProps {
  isLoading: boolean;
  assets: Asset[];
}

export const Assets = ({ assets, isLoading }: AssetProps) => (
  <ProfileItems isLoading={isLoading}>
    {assets.length > 0
      ? assets.map((asset) => {
          const { collectionName, type, id } = asset;
          const Badge = getBadge(type);
          return (
            <ProfileItemWrapper key={`${collectionName}-${id}`}>
              <AssetCard title={collectionName} Badge={Badge} {...asset} isCard={true} />
            </ProfileItemWrapper>
          );
        })
      : !isLoading && <ItemsPlaceholder>Nothing collected yet.</ItemsPlaceholder>}
  </ProfileItems>
);
