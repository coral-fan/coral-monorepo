import { getCollectionReferenceServerSide } from 'libraries/firebase';
import { MerchOptions, MerchOptionType, MerchOrder, MERCH_OPTIONS } from 'libraries/models';
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
  options: array().of(merchOptionSchema).min(1).nullable().defined(),
});

const isMerchOptionType = (merchOptionType: string): merchOptionType is MerchOptionType =>
  Object.keys(MERCH_OPTIONS).includes(merchOptionType);

const isMerchOptions = (
  options: InferType<typeof merchOptionSchema>[] | null
): options is MerchOptions => {
  if (options === null) {
    return true;
  }
  const encounteredTypes = new Set<string>();
  for (const { type, value } of options) {
    if (encounteredTypes.has(type) || !isMerchOptionType(type)) {
      return false;
    }
    encounteredTypes.add(type);
    // casting is necessary as a readyonly const array cannot call the includes methods
    if (!(MERCH_OPTIONS[type] as readonly string[]).includes(value)) {
      return false;
    }
  }
  return true;
};

const post: Handler = async (req, res) => {
  try {
    const { options, ...partialMerchOrder } = await createMerchOrderApiSchema.validate(req.body);

    if (isMerchOptions(options)) {
      const merchOrderCollectionRef = await getCollectionReferenceServerSide('merch-orders');

      const merchOrder: MerchOrder = {
        ...DEFAULT_MERCH_ORDER,
        timestamp: new Date().toISOString(),
        options,
        ...partialMerchOrder,
      };

      const { id } = await merchOrderCollectionRef.add(merchOrder);

      return res.status(200).json({ id });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json(ERROR_RESPONSE);
  }
};

export default getHandler({ post });
