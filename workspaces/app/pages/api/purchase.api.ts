import { getCollectionReferenceServerSide } from 'libraries/firebase';
import { PurchaseData } from 'libraries/models';
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
    const { userId, collectionId, transactionHash, metadata } = req.body;
    const purchaseCollectionRef = await getCollectionReferenceServerSide('purchases');

    const purchaseData: PurchaseData = {
      ...DEFAULT_PURCHASE_DATA,
      timestamp: new Date().toISOString(),
      userId,
      collectionId,
      transactionHash: transactionHash ?? null,
      metadata: metadata ?? null,
    };

    const { id } = await purchaseCollectionRef.add(purchaseData);

    return res.status(200).json({ id });
  } catch (e) {
    console.error(e);
    return res.status(500).json(ERROR_RESPONSE);
  }
};

export default getHandler({ post });
