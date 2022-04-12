import styled from '@emotion/styled';
import { DropCard, Heading, ScrollableItemWrapper, ScrollableContainer } from 'components/ui';
import { getBadge } from 'components/ui/badges/utils';
import { Collection } from 'libraries/models';
import { Event } from 'libraries/models/event';
import { useIsDesktop } from 'libraries/window';
import tokens from 'styles/tokens';

export type PartialCollection = Omit<
  Collection,
  'gatedContent' | 'price' | 'details' | 'description'
>;

export interface SimilarCollectionsProp {
  similarCollections: PartialCollection[];
}

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${tokens.spacing.mobile.lg};
`;

interface MerchProps {
  exclusiveCollections: NonNullable<Event['exclusiveCollections']>;
}
export const Merch = ({ exclusiveCollections }: MerchProps) => {
  const isDesktop = useIsDesktop();

  return (
    <Container>
      <Heading level={2} styleVariant={isDesktop ? 'h2' : 'h4'}>
        Exclusive Items
      </Heading>
      <ScrollableContainer>
        {exclusiveCollections.map((collection, i) => {
          const { name, type, dropDate } = collection;
          const Badge = getBadge(type);
          return (
            <ScrollableItemWrapper key={i}>
              <DropCard
                title={name}
                Badge={Badge}
                dropDateTimestamp={dropDate}
                {...collection}
                isCard={true}
              />
            </ScrollableItemWrapper>
          );
        })}
      </ScrollableContainer>
    </Container>
  );
};
