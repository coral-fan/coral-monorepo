import styled from '@emotion/styled';
import { Collection } from 'libraries/models';
import { GetServerSideProps } from 'next';
import { IMAGE_WITH_INFO_DEFAULT_ARGS } from 'components/ui/nft/components/ImageWithInfo/consts';
import { NextParsedUrlQuery } from 'next/dist/server/request-meta';
import { Details, ImageWithInfo, ShareButton } from 'components/ui/nft/components';
import { DropTimer, NftContent } from 'components/ui';
import { getBadge } from 'components/ui/badges/utils';
import { PartialCollection, SimilarCollections } from './components/SimilarCollections';
import tokens, { QUERIES } from 'styles/tokens';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.mobile.lg};
  margin-top: calc(
    -1 * ((2 * ${tokens.layout.padding.desktop.vertical}) + ${tokens.buttons.size.desktop})
  );

  @media ${QUERIES.tabletAndUp} {
    display: flex;
    flex-direction: row;
    gap: ${tokens.spacing.mobile.xl};
  }
`;

const ImageWrapper = styled.div`
  margin-left: calc(-1 * ${tokens.layout.padding.mobile.horizontal});
  margin-right: calc(-1 * ${tokens.layout.padding.mobile.horizontal});

  @media ${QUERIES.tabletAndUp} {
    flex: 1 0 56%;
    align-self: flex-start;
    position: sticky;
    margin-right: 0;
    top: 0;
  }

  @media ${QUERIES.laptopAndUp} {
    margin-left: calc(-1 * ${tokens.layout.padding.desktop.horizontal});
    flex: 1 0 48%;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.mobile.lg};

  @media ${QUERIES.tabletAndUp} {
    margin-top: calc((${tokens.layout.padding.desktop.vertical}) + ${tokens.buttons.size.desktop});
  }
`;

interface CollectionPageProps {
  collectionData: Collection;
  similarCollections: PartialCollection[];
}

export const CollectionPage = ({ collectionData, similarCollections }: CollectionPageProps) => {
  const {
    imageUrl,
    artistName,
    artistProfilePhoto,
    name,
    type,
    description,
    maxMintable,
    details,
    dropDate,
  } = collectionData;
  const Badge = getBadge(type);

  return (
    <Container>
      <ImageWrapper>
        <ImageWithInfo
          imageUrl={imageUrl}
          artistName={artistName}
          artistProfilePhoto={artistProfilePhoto}
          isCard={false}
        />
      </ImageWrapper>
      <ContentContainer>
        <NftContent
          title={name}
          titleHeadingLevel={2}
          titleStyleVariant={'h1'}
          description={description}
          Badge={Badge}
          isCard={false}
        />
        <DropTimer tokenSupply={maxMintable} timestamp={dropDate} />
        {details && <Details details={details} />}
        <ShareButton />
        {similarCollections && <SimilarCollections similarCollections={similarCollections} />}
      </ContentContainer>
    </Container>
  );
};

interface CollectionParams extends NextParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps<CollectionPageProps, CollectionParams> = async (
  context
) => {
  const { params } = context;

  if (params === undefined) {
    return {
      notFound: true,
    };
  }

  const { id } = params;

  // Call getSimilarDropsService to get similarCollectionData
  const similarCollections: PartialCollection[] = [
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

  // Make database call with collectionId to get collectionData.
  const collectionData: Collection = {
    id,
    name: 'Behind the Scenes Studio Tour',
    maxMintable: 5000,
    type: 'music',
    gatedContent: {
      type: 'url',
      url: '/',
    },
    price: 1000,
    dropDate: '2022-04-01',
    description:
      'Exclusive access to a one on one call with me between recording sessions on my next album. With this token you’ll get 30 minutes of solo time with me and the band.',
    details: [
      'A personal call between just you and Bonobo',
      'Available any time before March 1st, 2022',
      "Accessible by Zoom after you've torn the ticket",
    ],
    ...IMAGE_WITH_INFO_DEFAULT_ARGS,
  };
  return {
    props: {
      collectionData,
      similarCollections,
    },
  };
};
