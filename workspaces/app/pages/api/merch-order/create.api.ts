import { getCollectionReferenceServerSide } from 'libraries/firebase';
import { MerchOptions, MerchOrder } from 'libraries/models';
import { array, InferType, object, string } from 'yup';
import { ERROR_RESPONSE } from '../consts';
import { Handler } from '../types';
import { getHandler } from '../utils';

type DefaultMerchOrder = Pick<MerchOrder, 'status' | 'transactionHash'>;

const DEFAULT_MERCH_ORDER: DefaultMerchOrder = {
  status: 'pending',
  transactionHash: null,
};

const merchOptionSchema = object({
  type: string().required(),
  value: string().required(),
});

const createMerchOrderApiSchema = object({
  shippingInfoId: string().required(),
  userId: string().required(),
  collectionId: string().required(),
  options: array().of(merchOptionSchema).min(1),
});

const post: Handler = async (req, res) => {
  try {
    const { options, ...partialMerchOrder } = await createMerchOrderApiSchema.validate(req.body);

    const merchOrderCollectionRef = await getCollectionReferenceServerSide('merch-orders');

    const merchOrder: MerchOrder = {
      ...DEFAULT_MERCH_ORDER,
      timestamp: new Date().toISOString(),
      ...partialMerchOrder,
    };

    if (options !== undefined) {
      merchOrder.options = options;
    }

    const { id } = await merchOrderCollectionRef.add(merchOrder);

    return res.status(200).json({ id });
  } catch (e) {
    console.error(e);
    return res.status(500).json(ERROR_RESPONSE);
  }
};

export default getHandler({ post });
