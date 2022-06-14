import styled from '@emotion/styled';
import { DropCard, Heading, ScrollableItemWrapper, ScrollableContainer } from 'components/ui';
import { getBadge } from 'components/ui/badges/utils';
import { Collection } from 'libraries/models';
import { Event } from 'libraries/models/stream';
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

const ItemsPlaceholder = styled.div`
  font-style: italic;
  font-size: ${tokens.font.size.md};
  letter-spacing: ${tokens.font.letter_spacing.md};
  line-height: ${tokens.font.line_height.md};
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
      {exclusiveCollections.length > 0 ? (
        <ScrollableContainer>
          {exclusiveCollections.map((collection) => {
            const { id, name, type, dropDate } = collection;
            const Badge = getBadge(type);
            return (
              <ScrollableItemWrapper key={id}>
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
      ) : (
        <ItemsPlaceholder>No items available.</ItemsPlaceholder>
      )}
    </Container>
  );
};
