import { getEnvironmentVariableErrorMessage } from 'libraries/utils';
import { getDocumentReferenceServerSide } from 'libraries/firebase';
import { PurchaseData } from 'libraries/models';
import { Handler } from '../../types';
import { getHandler } from '../../utils';
import Stripe from 'stripe';
import { buffer } from 'micro';
import { NextApiRequest, NextApiResponse } from 'next/types';
import { ERROR_RESPONSE } from '../../consts';

// defender
import { DefenderRelayProvider, DefenderRelaySigner } from 'defender-relay-client/lib/ethers';
import { Coral__factory } from '@coral/contracts';
import { ethers } from 'ethers';

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

  if (!sig || !webhookSecret) {
    return res.status(500).send(ERROR_RESPONSE);
  }

  let transactionDocRef: FirebaseFirestore.DocumentReference<PurchaseData> | undefined;
  try {
    const event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    const paymentIntent = event.data.object as Stripe.PaymentIntent;

    if (paymentIntent.status === 'requires_capture') {
      const { id, metadata } = paymentIntent;
      const { collectionId, userId } = metadata;

      if (!userId || !collectionId) {
        throw 'userId or collectionId does not exist in metadata field';
      }
      transactionDocRef = await getDocumentReferenceServerSide<PurchaseData>('transactions', id);

      await transactionDocRef.create({
        userId,
        collectionId,
        status: 'pending',
        hash: null,
        assetId: null,
      });

      // Relayer - Mint NFT
      const provider = new DefenderRelayProvider(RELAYER_CREDENTIALS);
      const signer = new DefenderRelaySigner(RELAYER_CREDENTIALS, provider, { speed: 'fast' });

      const nftContract = Coral__factory.connect(collectionId, signer);

      const { hash } = await nftContract.relayMint(userId);

      await transactionDocRef.update('hash', hash);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- must type error as any to access properties
  } catch (e: any) {
    transactionDocRef?.get().then((data) => {
      if (data.exists) {
        transactionDocRef?.update('status', 'rejected');
      }
    });
    console.error(e.message);
  }

  return res.status(200).send('');
};

export default getHandler({ post });
