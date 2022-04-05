import { Collection } from 'libraries/models';
import { GetServerSideProps } from 'next';
import { IMAGE_WITH_INFO_DEFAULT_ARGS } from 'components/ui/nft/components/ImageWithInfo/consts';
import { NextParsedUrlQuery } from 'next/dist/server/request-meta';
import { Details, ImageWithInfo, ShareButton, ShareCard } from 'components/ui/nft/components';
import { NftContent } from 'components/ui';
import { getBadge } from 'components/ui/badges/utils';
import { PartialCollection, SimilarCollections } from './components/SimilarCollections';
import { Container, ContentContainer, ImageWrapper } from './components';
import { DropOrAvailable } from './components/DropOrAvailable';
import { ShareModal } from 'components/app/components/ShareModal';
import { useCallback, useState } from 'react';

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
    price,
    id,
  } = collectionData;

  const Badge = getBadge(type);

  // Dummy Data: comes from Smart Contract Call
  const numMinted = 2500;

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const closeShareModal = useCallback(() => setIsShareModalOpen(false), []);

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
        <DropOrAvailable
          priceUsd={price}
          maxMintable={maxMintable}
          numMinted={numMinted}
          dropDate={dropDate}
        />
        {details && <Details details={details} />}
        <ShareButton
          onClick={() => {
            console.log('clicked');
            setIsShareModalOpen(true);
          }}
        />
        {isShareModalOpen && (
          <ShareModal
            title={'Share Drop'}
            url={`https://coral.fan/collection/${id}`}
            postTitle={name}
            closeShareModal={closeShareModal}
          >
            <ShareCard
              imageUrl={imageUrl}
              artistName={artistName}
              artistProfilePhoto={artistProfilePhoto}
              isCard={true}
              title={name}
              titleHeadingLevel={2}
              titleStyleVariant={'h3'}
              description={description}
              Badge={Badge}
            />
          </ShareModal>
        )}
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
    price: 300,
    dropDate: '2022 Apr 05 10:23:00 EDT',
    description:
      'Exclusive access to a one on one call with me between recording sessions on my next album. With this token you’ll get 30 minutes of solo time with me and the band.Exclusive access to a one on one call with me between recording sessions on my next album. With this token you’ll get 30 minutes of solo time with me and the band.',
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
