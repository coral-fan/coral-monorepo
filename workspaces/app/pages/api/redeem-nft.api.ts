import { NextApiRequest, NextApiResponse } from 'next/types';
import { CoralNftV1__factory } from '@coral/contracts';

import { ERROR_RESPONSE } from './consts';
import { getHandler, getRelaySigner } from './utils';
import { Handler } from './types';
import { object, string } from 'yup';
import { RedeemCode } from 'libraries/models';
import { getDocumentReferenceServerSide } from 'libraries/firebase';

export const redeemNftParamsSchema = object({
  collectionId: string().required(),
  userId: string().required(),
  code: string().required(),
});

export const post: Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let redeemCodeDocRef;
  try {
    const { collectionId, code, userId } = await redeemNftParamsSchema.validate(req.body);

    redeemCodeDocRef = await getDocumentReferenceServerSide<RedeemCode>(
      `app/redeem-codes/${collectionId}`,
      code
    );

    const redeemCodeDocSnapshot = await redeemCodeDocRef.get();

    const redeemCode = redeemCodeDocSnapshot.data();

    if (redeemCode === undefined) {
      throw new Error(
        `Redeem code ${redeemCode} doesn't exist for collection with id ${collectionId} doesn't exist in database.`
      );
    }
    const userDocRef = await getDocumentReferenceServerSide('users', userId);
    const userDocSnapshot = await userDocRef.get();

    if (!userDocSnapshot.exists) {
      throw new Error(`user with id ${userId} doesn't exist in database.`);
    }

    if (!redeemCode.isRedeemed) {
      await redeemCodeDocRef.set({ isRedeemed: true }, { merge: true });
      // Relayer - Mint NFT
      const signer = await getRelaySigner();
      const nftContract = CoralNftV1__factory.connect(collectionId, signer);
      const { hash } = await nftContract.relayMint(userId);

      const response = { transactionHash: hash };

      await redeemCodeDocRef.set(response, { merge: true });

      return res.status(200).send(response);
    }
  } catch (e) {
    await redeemCodeDocRef?.set({ isRedeemed: false }, { merge: true });
    console.error(e);
  }
  return res.status(500).send(ERROR_RESPONSE);
};

export default getHandler({ post });
