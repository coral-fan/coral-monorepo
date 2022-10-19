import { GetServerSideProps } from 'next';

import { NextParsedUrlQuery } from 'next/dist/server/request-meta';

import {
  Collection,
  PartialCollection,
  getCollection,
  getSimilarCollections,
} from 'libraries/models';
import { DropOrAvailable, SimilarCollections } from './components';
import { GatedContent, Layout as CollectionLayout } from 'components/ui/nft';
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
import { ConditionalWrap, Link } from 'components/ui';
import { css } from '@emotion/react';

import { load as loadFingerprintAgent } from '@fingerprintjs/fingerprintjs';
import { getCoralAPIAxios } from 'libraries/utils';

interface CollectionLinkProps {
  id: string;
}
const CollectionLink = ({ id }: CollectionLinkProps) => (
  <Link
    css={css`
      text-decoration: underline;
    `}
    href={`/collection/${id}`}
  >
    {id}
  </Link>
);

const getPunctuation = (index: number, length: number) => {
  if (index === length - 1) {
    return '';
  }

  if (index === length - 2) {
    return ' and ';
  }

  return ', ';
};

const getCollectionLinks = (collectionIds: string[]) => {
  if (collectionIds.length === 0) {
    throw "collectionIds can't be an empty array";
  }
  if (collectionIds.length === 1) {
    return <CollectionLink id={collectionIds[0]} />;
  }
  return collectionIds.map((id, index) => (
    <>
      <CollectionLink key={id} id={id} />
      {getPunctuation(index, collectionIds.length)}
    </>
  ));
};

// similarCollections optional so failure to fetch
// doesn't block page from loading
interface CollectionPageProps extends Collection {
  similarCollections?: PartialCollection[];
  tokenTotalSupply: number;
  redeemCode: NullableString;
}

const stripePromise = loadStripe(NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const axios = getCoralAPIAxios();

const SOLD_OUT_COLLECTIONS = ['0x1e7EaEC099c34843721d93B0A90bbDbb693CD7Ea'];

export const CollectionPage = ({
  tokenTotalSupply,
  imageUrl,
  creatorName,
  creatorProfilePhoto: artistProfilePhoto,
  artistId,
  name,
  type,
  description,
  maxSupply,
  details,
  dropTime,
  price,
  id,
  similarCollections,
  maxMintablePerWallet,
  redeemCode,
  merchOptions,
  accessGrantingTokenAddresses,
  activeCampaign,
}: CollectionPageProps) => {
  const [numMinted, setNumMinted] = useState(tokenTotalSupply);
  const [isSoldOut, setIsSoldOut] = useState(
    tokenTotalSupply >= maxSupply ||
      SOLD_OUT_COLLECTIONS.find((soldOutCollectionId) => id === soldOutCollectionId) !== undefined
  );

  console.log(id);
  const [fingerprint, setFingerprint] = useState<string>();

  // fingerprint logic
  useEffect(() => {
    loadFingerprintAgent().then(async (agent) => {
      const { visitorId: fingerprint } = await agent.get();

      const referralCode = new URLSearchParams(window.location.search).get('referral_code');
      if (referralCode) {
        axios
          .post('record-fingerprint', {
            referrer: document.referrer,
            referralCode,
            fingerprint,
          })
          .catch((e) => console.error(e));
      }
      setFingerprint(fingerprint);
    });
  }, []);

  useEffect(() => {
    const subscription = getTokenTotalSupply$(id).subscribe((totalSupply) => {
      setNumMinted(totalSupply);
      setIsSoldOut((isSoldOut) => isSoldOut || totalSupply >= maxSupply);
    });
    return () => subscription.unsubscribe();
  }, [id, maxSupply]);

  const dropOrAvailable = useMemo(
    () => (
      <DropOrAvailable
        dropTime={dropTime}
        numMinted={numMinted}
        maxSupply={maxSupply}
        isSoldOut={isSoldOut}
        usdPrice={price}
        collectionName={name}
        collectionId={id}
        collectionDetails={details}
        maxMintablePerWallet={maxMintablePerWallet}
        artistId={artistId}
        creatorName={creatorName}
        creatorProfilePhoto={artistProfilePhoto}
        imageUrl={imageUrl}
        redeemCode={redeemCode}
        merchOptions={merchOptions}
        fingerprint={fingerprint}
      />
    ),
    [
      artistId,
      dropTime,
      maxSupply,
      price,
      name,
      creatorName,
      artistProfilePhoto,
      imageUrl,
      numMinted,
      id,
      isSoldOut,
      details,
      maxMintablePerWallet,
      redeemCode,
      merchOptions,
      fingerprint,
    ]
  );

  const similarCollectionsSection = useMemo(
    () => similarCollections && <SimilarCollections similarCollections={similarCollections} />,
    [similarCollections]
  );

  return (
    <ConditionalWrap
      shouldWrap={accessGrantingTokenAddresses !== null}
      wrap={(children) => {
        if (accessGrantingTokenAddresses === null) {
          throw "accessGrantingTokenAddresses can't be null";
        }
        return (
          <GatedContent
            accessGrantingTokenAddresses={accessGrantingTokenAddresses}
            accessDeniedModalProps={{
              title: 'This is an exclusive collection',
              actionElement: (
                <div>
                  {'Only holders of '}
                  {getCollectionLinks(accessGrantingTokenAddresses)}
                  {' have access to this collection.'}
                </div>
              ),
            }}
          >
            {children}
          </GatedContent>
        );
      }}
    >
      <Elements stripe={stripePromise}>
        <CollectionLayout
          isAsset={false}
          type={type}
          imageUrl={imageUrl}
          creatorName={creatorName}
          creatorProfilePhoto={artistProfilePhoto}
          artistId={artistId}
          name={name}
          description={description}
          details={details}
          collectionId={id}
          dropOrAvailable={dropOrAvailable}
          similarCollections={similarCollectionsSection}
          activeCampaign={activeCampaign}
        />
      </Elements>
    </ConditionalWrap>
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

    const collection = await getCollection(collectionId);

    const [similarCollections, tokenTotalSupply] = await Promise.all([
      getSimilarCollections(collectionId, 4),
      getTokenTotalSupply(collectionId),
    ]);

    const redeemCode = await validateRedeemCode(collectionId, query.redeem_code);

    return {
      props: {
        ...collection,
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
