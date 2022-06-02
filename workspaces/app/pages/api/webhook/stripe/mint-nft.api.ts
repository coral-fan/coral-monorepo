import { getEnvironmentVariableErrorMessage } from 'libraries/utils';
import { Handler } from '../../types';
import { getHandler, getPurchaseDocumentReference } from '../../utils';
import Stripe from 'stripe';
import { NextApiRequest, NextApiResponse } from 'next/types';
import { ERROR_RESPONSE } from '../../consts';

// defender
import { DefenderRelayProvider, DefenderRelaySigner } from 'defender-relay-client/lib/ethers';
import { CoralNftV1__factory } from '@coral/contracts';

import { buffer } from 'micro';

if (!process.env.STRIPE_WEBHOOK_SIGNING_SECRET) {
  throw Error(getEnvironmentVariableErrorMessage('STRIPE_WEBHOOK_SIGNING_SECRET'));
}

if (!process.env.STRIPE_SECRET_KEY) {
  throw Error(getEnvironmentVariableErrorMessage('STRIPE_SECRET_KEY'));
}

if (!process.env.RELAYER_API_KEY) {
  throw Error(getEnvironmentVariableErrorMessage('RELAYER_API_KEY'));
}

if (!process.env.RELAYER_SECRET_KEY) {
  throw Error(getEnvironmentVariableErrorMessage('RELAYER_SECRET_KEY'));
}

const STRIPE_WEBHOOK_SIGNING_SECRET = process.env.STRIPE_WEBHOOK_SIGNING_SECRET;
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const RELAYER_API_KEY = process.env.RELAYER_API_KEY;
const RELAYER_SECRET_KEY = process.env.RELAYER_SECRET_KEY;

const RELAYER_CREDENTIALS = { apiKey: RELAYER_API_KEY, apiSecret: RELAYER_SECRET_KEY };

// configures Next API
export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2020-08-27' });

export const post: Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];
  const webhookSecret = STRIPE_WEBHOOK_SIGNING_SECRET;

  if (!sig) {
    console.error(`Stripe signature (stripe-signature) not in request header!`);
    return res.status(500).json(ERROR_RESPONSE);
  }

  let purchaseDocRef;
  try {
    const event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    const paymentIntent = event.data.object as Stripe.PaymentIntent;

    if (paymentIntent.status === 'requires_capture') {
      const { metadata } = paymentIntent;
      const { collectionId, userId, purchaseId } = metadata;

      if (!userId || !collectionId || !purchaseId) {
        throw 'userId or collectionId does not exist in metadata field';
      }
      purchaseDocRef = await getPurchaseDocumentReference(purchaseId);

      const purchaseDocSnapshot = await purchaseDocRef.get();

      // this check ensures a mint transaction hasn't been made for the purchase yet
      const shouldRelayMint = !purchaseDocSnapshot.data()?.transactionHash;
      if (shouldRelayMint) {
        // Relayer - Mint NFT
        const provider = new DefenderRelayProvider(RELAYER_CREDENTIALS);
        const signer = new DefenderRelaySigner(RELAYER_CREDENTIALS, provider, { speed: 'fast' });

        const nftContract = CoralNftV1__factory.connect(collectionId, signer);

        const { hash } = await nftContract.relayMint(userId);

        await purchaseDocRef.set({ transactionHash: hash }, { merge: true });
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- must type error as any to access properties
  } catch (e: any) {
    purchaseDocRef?.set({ status: 'rejected' }, { merge: true });
    console.error(e);
    if (e instanceof stripe.errors.StripeSignatureVerificationError) {
      return res.status(500).send(ERROR_RESPONSE);
    }
  }

  return res.status(200).send('');
};

export default getHandler({ post });
