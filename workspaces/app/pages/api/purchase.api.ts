import { getCollectionReferenceServerSide, getDocumentData } from 'libraries/firebase';
import { PurchaseData, ReferralData } from 'libraries/models';
import { ERROR_RESPONSE } from './consts';
import { Handler } from './types';
import { getHandler } from './utils';

type DefaultPurchaseData = Pick<PurchaseData, 'status' | 'assetId'>;

const DEFAULT_PURCHASE_DATA: DefaultPurchaseData = {
  status: 'pending',
  assetId: null,
};

const post: Handler = async (req, res) => {
  try {
    // TODO: add validation!!!
    const { userId, collectionId, transactionHash, fingerprint } = req.body;
    const purchaseCollectionRef = await getCollectionReferenceServerSide('purchases');

    const fingerprintData = await getDocumentData<{ referralCode: string }>(
      'fingerprints',
      fingerprint
    );

    let metadata = null;

    // check to ensure referral code is for correct collection
    if (fingerprintData) {
      const { referralCode } = fingerprintData;

      const referral = await getDocumentData<ReferralData>('referrals', referralCode);

      if (referral && referral.collectionId === collectionId) {
        metadata = { fingerprint };
      }
    }

    const purchaseData: PurchaseData = {
      ...DEFAULT_PURCHASE_DATA,
      timestamp: new Date().toISOString(),
      userId,
      collectionId,
      transactionHash: transactionHash ?? null,
      metadata,
    };

    const { id } = await purchaseCollectionRef.add(purchaseData);

    return res.status(200).json({ id });
  } catch (e) {
    console.error(e);
    return res.status(500).json(ERROR_RESPONSE);
  }
};

export default getHandler({ post });
