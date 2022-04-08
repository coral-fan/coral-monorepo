import { GetServerSideProps } from 'next';

import { NextParsedUrlQuery } from 'next/dist/server/request-meta';
import { IMAGE_WITH_INFO_DEFAULT_ARGS } from 'components/ui/nft/components/ImageWithInfo/consts';

import { Collection } from 'libraries/models';
import { PartialCollection } from './components/SimilarCollections';
import { DropOrAvailable } from './components';
import { Layout as CollectionLayout } from 'components/ui/nft';
import { SimilarCollections } from './components/SimilarCollections';
import { useMemo } from 'react';

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

  // Dummy Data: comes from Smart Contract Call
  // Todo: Update AVAX pricing
  const numMinted = 2500;

  const dropOrAvailable = useMemo(
    () => (
      <DropOrAvailable
        dropDate={dropDate}
        numMinted={numMinted}
        maxMintable={maxMintable}
        priceUsd={price}
      />
    ),
    [dropDate, numMinted, maxMintable, price]
  );

  const similarCollectionsSection = useMemo(
    () => <SimilarCollections similarCollections={similarCollections} />,
    [similarCollections]
  );

  return (
    <CollectionLayout
      isAsset={false}
      type={type}
      imageUrl={imageUrl}
      artistName={artistName}
      artistProfilePhoto={artistProfilePhoto}
      name={name}
      description={description}
      details={details}
      collectionId={id}
      dropOrAvailable={dropOrAvailable}
      similarCollections={similarCollectionsSection}
    />
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
    dropDate: '2022 Apr 08 15:07:00 EDT',
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
