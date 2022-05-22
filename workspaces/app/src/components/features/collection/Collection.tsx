import { GetServerSideProps } from 'next';

import { NextParsedUrlQuery } from 'next/dist/server/request-meta';

import { Collection, getCollection, getSimilarCollections } from 'libraries/models/collection';
import { DropOrAvailable, SimilarCollections, PartialCollection } from './components';
import { Layout as CollectionLayout } from 'components/ui/nft';
import { useEffect, useMemo, useState } from 'react';
import { getTokenTotalSupply } from 'libraries/blockchain/utils';

// stripe
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY } from 'libraries/stripe/consts';

// similarCollections optional so failure to fetch
// doesn't block page from loading
interface CollectionPageProps extends Collection {
  similarCollections?: PartialCollection[];
}

const stripePromise = loadStripe(NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export const CollectionPage = ({
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
  similarCollections,
  gatedContent,
}: CollectionPageProps) => {
  const [numMinted, setNumMinted] = useState(0);

  useEffect(() => {
    const fetchNumMinted = async (id: string) => {
      const numMinted = await getTokenTotalSupply(id);
      setNumMinted(numMinted);
    };

    fetchNumMinted(id);
  }, [id]);

  const isSoldOut = numMinted >= maxMintable;

  const dropOrAvailable = useMemo(
    () => (
      <DropOrAvailable
        dropDate={dropDate}
        numMinted={numMinted}
        maxMintable={maxMintable}
        isSoldOut={isSoldOut}
        usdPrice={price}
        collectionName={name}
        collectionId={id}
        collectionDetails={details}
        artistId={artistId}
        artistName={artistName}
        artistProfilePhoto={artistProfilePhoto}
        imageUrl={imageUrl}
        type={type}
        gatedContent={gatedContent}
      />
    ),
    [
      artistId,
      dropDate,
      maxMintable,
      price,
      name,
      artistName,
      artistProfilePhoto,
      imageUrl,
      type,
      numMinted,
      id,
      isSoldOut,
      details,
      gatedContent,
    ]
  );

  const similarCollectionsSection = useMemo(
    () => similarCollections && <SimilarCollections similarCollections={similarCollections} />,
    [similarCollections]
  );

  return (
    <Elements stripe={stripePromise}>
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
    </Elements>
  );
};

interface CollectionParams extends NextParsedUrlQuery {
  collectionId: string;
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

  const { collectionId } = params;

  const collectionData = await getCollection(collectionId);

  if (collectionData === undefined) {
    return {
      notFound: true,
    };
  }

  const similarCollections = await getSimilarCollections(collectionId, 4);

  return {
    props: {
      ...collectionData,
      similarCollections,
    },
  };
};
