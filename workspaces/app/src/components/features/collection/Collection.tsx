import { GetServerSideProps } from 'next';

import { NextParsedUrlQuery } from 'next/dist/server/request-meta';

import { Collection, getCollection, getSimilarCollections } from 'libraries/models/collection';
import { DropOrAvailable, SimilarCollections, PartialCollection } from './components';
import { Layout as CollectionLayout } from 'components/ui/nft';
import { useEffect, useMemo, useState } from 'react';

// stripe
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY } from 'libraries/stripe/consts';
import { getTokenTotalSupply$ } from 'libraries/blockchain/observables';

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
  maxSupply,
  details,
  dropDate,
  price,
  id,
  similarCollections,
  maxMintablePerWallet,
}: CollectionPageProps) => {
  const [numMinted, setNumMinted] = useState(0);
  const [isSoldOut, setIsSoldOut] = useState(false);

  useEffect(() => {
    const subscription = getTokenTotalSupply$(id).subscribe((totalSupply) => {
      setNumMinted(totalSupply);
      setIsSoldOut(totalSupply >= maxSupply);
    });

    return () => subscription.unsubscribe();
  }, [id, maxSupply]);

  const dropOrAvailable = useMemo(
    () => (
      <DropOrAvailable
        dropDate={dropDate}
        numMinted={numMinted}
        maxSupply={maxSupply}
        isSoldOut={isSoldOut}
        usdPrice={price}
        collectionName={name}
        collectionId={id}
        collectionDetails={details}
        maxMintablePerWallet={maxMintablePerWallet}
        artistId={artistId}
        artistName={artistName}
        artistProfilePhoto={artistProfilePhoto}
        imageUrl={imageUrl}
        type={type}
      />
    ),
    [
      artistId,
      dropDate,
      maxSupply,
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
      maxMintablePerWallet,
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
  try {
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
  } catch (e) {
    console.error(e);
    return {
      notFound: true,
    };
  }
};
