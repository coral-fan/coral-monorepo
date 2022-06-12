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
import { getTokenTotalSupply } from 'libraries/blockchain/utils';
import { getDocumentReferenceServerSide } from 'libraries/firebase';
import { RedeemCode } from 'libraries/models/redeemCode';
import { NullableString } from 'libraries/models';

// similarCollections optional so failure to fetch
// doesn't block page from loading
interface CollectionPageProps extends Collection {
  similarCollections?: PartialCollection[];
  tokenTotalSupply: number;
  redeemCode: NullableString;
}

const stripePromise = loadStripe(NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export const CollectionPage = ({
  tokenTotalSupply,
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
  redeemCode,
}: CollectionPageProps) => {
  const [numMinted, setNumMinted] = useState(tokenTotalSupply);
  const [isSoldOut, setIsSoldOut] = useState(tokenTotalSupply >= maxSupply);

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
        redeemCode={redeemCode}
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
      numMinted,
      id,
      isSoldOut,
      details,
      maxMintablePerWallet,
      type,
      redeemCode,
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

const validateRedeemCode = async (collectionId: string, code: NextParsedUrlQuery[string]) => {
  if (typeof code === 'string') {
    const redeemCodeDocRef = await getDocumentReferenceServerSide<RedeemCode>(
      `app/redeem-codes/${collectionId}`,
      code
    );

    const redeemCodeSnapshot = await redeemCodeDocRef.get();
    if (redeemCodeSnapshot.exists) {
      const redeemCode = redeemCodeSnapshot.data();
      if (redeemCode !== undefined && !redeemCode.isRedeemed) {
        return code;
      }
    }
  }
  return null;
};

interface CollectionParams extends NextParsedUrlQuery {
  collectionId: string;
}

export const getServerSideProps: GetServerSideProps<CollectionPageProps, CollectionParams> = async (
  context
) => {
  try {
    const { params, query } = context;

    if (params === undefined) {
      throw new Error('params should never be undefined.');
    }

    const { collectionId } = params;

    const collectionData = await getCollection(collectionId);

    const [similarCollections, tokenTotalSupply] = await Promise.all([
      getSimilarCollections(collectionId, 4),
      getTokenTotalSupply(collectionId),
    ]);

    const redeemCode = await validateRedeemCode(collectionId, query.redeem_code);

    return {
      props: {
        ...collectionData,
        redeemCode,
        tokenTotalSupply,
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
