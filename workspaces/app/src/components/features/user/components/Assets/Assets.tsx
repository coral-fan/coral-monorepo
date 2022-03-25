import { getBadge } from 'components/ui/badges/utils';
import { Asset } from 'libraries/models';
import { CardsContainer } from 'components/ui';
import { AssetCardWrapper } from 'components/ui/profile';
import { AssetCard } from '../AssetCard';

interface AssetProps {
  assets: Asset[];
}

export const Assets = ({ assets }: AssetProps) => (
  <CardsContainer>
    {assets.map((asset) => {
      const { collectionName, artistName, artistProfilePhoto, imageUrl, type, id, collectionId } =
        asset;
      const badge = getBadge(type);
      return (
        <AssetCardWrapper key={id}>
          <AssetCard
            id={id}
            collectionId={collectionId}
            title={collectionName}
            Badge={badge}
            imageUrl={imageUrl}
            artistName={artistName}
            artistProfilePhoto={artistProfilePhoto}
          />
        </AssetCardWrapper>
      );
    })}
  </CardsContainer>
);
