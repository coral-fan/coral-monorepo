import styled from '@emotion/styled';
import { DropCard, Heading, ScrollableItemWrapper, ScrollableContainer } from 'components/ui';
import { getBadge } from 'components/ui/badges/utils';
import { IMAGE_WITH_INFO_DEFAULT_ARGS } from 'components/ui/nft/components/ImageWithInfo/consts';
import { Collection } from 'libraries/models';
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
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${tokens.spacing.mobile.lg};
`;

const exclusiveCollections: PartialCollection[] = [
  {
    id: '2',
    name: 'Similar Collection!',
    maxMintable: 10000,
    type: 'video',
    dropDate: '2022-06-01',
    ...IMAGE_WITH_INFO_DEFAULT_ARGS,
  },
  {
    id: '3',
    name: 'Another Similar Collection!',
    maxMintable: 5000,
    type: 'event',
    dropDate: '2022-09-01',
    ...IMAGE_WITH_INFO_DEFAULT_ARGS,
  },
  {
    id: '4',
    name: 'Super Merch',
    maxMintable: 5000,
    type: 'merch',
    dropDate: '2022-08-01',
    ...IMAGE_WITH_INFO_DEFAULT_ARGS,
  },
  {
    id: '4',
    name: 'Super Merch Again',
    maxMintable: 5000,
    type: 'merch',
    dropDate: '2022-08-01',
    ...IMAGE_WITH_INFO_DEFAULT_ARGS,
  },
];

export const Merch = () => {
  const isDesktop = useIsDesktop();

  return (
    <Container>
      <Heading level={2} styleVariant={isDesktop ? 'h2' : 'h4'}>
        Exclusive Items
      </Heading>
      <ScrollableContainer>
        {exclusiveCollections.map((collection) => {
          const { name, type, dropDate } = collection;
          const Badge = getBadge(type);
          return (
            <ScrollableItemWrapper key={`${collection.artistName}-${name}-${dropDate}`}>
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
