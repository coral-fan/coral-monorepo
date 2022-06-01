import { getBadge } from 'components/ui/badges/utils';
import { DropCard } from 'components/ui';
import { Collection } from 'libraries/models';
import { ItemsPlaceholder, sortCollectionByDropDateDesc } from 'components/ui/profile';
import { ProfileItems } from 'components/ui';
import { ProfileItemWrapper } from 'components/ui/profile';

interface CollectionProps {
  collections: Collection[];
}

export const Collections = ({ collections }: CollectionProps) => (
  <ProfileItems>
    {collections.length > 0 ? (
      sortCollectionByDropDateDesc(collections).map((collection) => {
        const { id, name, type, dropDate } = collection;
        const Badge = getBadge(type);
        return (
          <ProfileItemWrapper key={id}>
            <DropCard
              title={name}
              Badge={Badge}
              dropDateTimestamp={dropDate}
              {...collection}
              //TODO: Remove description prop after data fetching added
              description={''}
              isCard
            />
          </ProfileItemWrapper>
        );
      })
    ) : (
      <ItemsPlaceholder>First drop coming soon.</ItemsPlaceholder>
    )}
  </ProfileItems>
);
