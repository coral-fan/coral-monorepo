import { GetServerSideProps } from 'next';

import { NextParsedUrlQuery } from 'next/dist/server/request-meta';

import { Collection, getCollection, getSimilarCollections } from 'libraries/models';
import { DropOrAvailable, SimilarCollections, PartialCollection } from './components';
import { Layout as CollectionLayout } from 'components/ui/nft';
import { SERVER_ENVIRONMENT } from 'consts';
import { useEffect, useMemo, useState } from 'react';
import { getTokenTotalSupply } from 'libraries/blockchain/utils';

// similarCollections optional so failure to fetch
// doesn't block page from loading
interface CollectionPageProps {
  collectionData: Collection;
  similarCollections?: PartialCollection[];
}

export const CollectionPage = ({
  collectionData: {
    imageUrl,
    artistName,
    artistProfilePhoto,
    artistId,
    name,
    type,
    description,
    maxMintable,
    details,
    dropDate,
    price,
    id,
  },
  similarCollections,
}: CollectionPageProps) => {
  const [numMinted, setNumMinted] = useState(0);

  useEffect(() => {
    const fetchNumMinted = async (id: string) => {
      const numMinted = await getTokenTotalSupply(id);
      setNumMinted(numMinted);
    };

    fetchNumMinted(id);
  }, [id]);

  const dropOrAvailable = useMemo(
    () => (
      <DropOrAvailable
        dropDate={dropDate}
        numMinted={numMinted}
        maxMintable={maxMintable}
        usdPrice={price}
        collectionName={name}
        artistName={artistName}
        artistProfilePhoto={artistProfilePhoto}
        imageUrl={imageUrl}
        type={type}
      />
    ),
    [dropDate, maxMintable, price, name, artistName, artistProfilePhoto, imageUrl, type, numMinted]
  );

  const similarCollectionsSection = useMemo(
    () => similarCollections && <SimilarCollections similarCollections={similarCollections} />,
    [similarCollections]
  );

  return (
    <CollectionLayout
      isAsset={false}
      type={type}
      imageUrl={imageUrl}
      artistName={artistName}
      artistProfilePhoto={artistProfilePhoto}
      artistId={artistId}
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
  collectionId: string;
}

export const getServerSideProps: GetServerSideProps<CollectionPageProps, CollectionParams> = async (
  context
) => {
  //  TODO: remove conditional return for sign up campaign
  if (SERVER_ENVIRONMENT === 'production') {
    return {
      notFound: true,
    };
  }

  const { params } = context;

  if (params === undefined) {
    return {
      notFound: true,
    };
  }

  const { collectionId } = params;

  const collectionData = await getCollection(collectionId);

  if (!collectionData) {
    return {
      notFound: true,
    };
  }

  const similarCollections = await getSimilarCollections(collectionId, 4);

  return {
    props: {
      collectionData,
      similarCollections,
    },
  };
};
