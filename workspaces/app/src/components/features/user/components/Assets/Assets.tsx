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
      const { collectionName, type, id } = asset;
      const Badge = getBadge(type);
      return (
        <ProfileItemWrapper key={`${collectionName}-${id}`}>
          <AssetCard title={collectionName} Badge={Badge} {...asset} />
        </ProfileItemWrapper>
      );
    })}
  </ProfileItems>
);
