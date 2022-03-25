import { getBadge } from 'components/ui/badges/utils';
import { DropCard } from 'components/ui';
import { Collection } from 'libraries/models';
import { sortCollectionByDropDateDesc } from 'components/ui/profile';
import { CardsContainer } from 'components/ui';
import { AssetCardWrapper } from 'components/ui/profile';

interface CollectionProps {
  collections: Collection[];
}

export const Collections = ({ collections }: CollectionProps) => {
  return (
    <CardsContainer>
      {sortCollectionByDropDateDesc(collections).map((collection) => {
        const { name, artistName, artistProfilePhoto, imageUrl, type, id, dropDate } = collection;
        const badge = getBadge(type);
        return (
          <AssetCardWrapper key={name}>
            <DropCard
              id={id}
              title={name}
              Badge={badge}
              imageUrl={imageUrl}
              artistName={artistName}
              artistProfilePhoto={artistProfilePhoto}
              dropDateTimestamp={dropDate}
            />
          </AssetCardWrapper>
        );
      })}
    </CardsContainer>
  );
};
