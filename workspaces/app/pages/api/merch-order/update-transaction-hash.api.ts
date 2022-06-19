import { object, string } from 'yup';
import { ERROR_RESPONSE } from '../consts';
import { Handler } from '../types';
import { getHandler } from '../utils';
import { updateMerchOrderTransactionHash } from './utils';

const updateMerchOrderTransactionHashApiSchema = object({
  merchOrderId: string().required(),
  transactionHash: string().required(),
});

const post: Handler = async (req, res) => {
  try {
    const { merchOrderId, transactionHash } =
      await updateMerchOrderTransactionHashApiSchema.validate(req.body);

    const writeTime = await updateMerchOrderTransactionHash(merchOrderId, transactionHash);

    return res.status(200).json({ writeTime });
  } catch (e) {
    console.error(e);
    return res.status(500).json(ERROR_RESPONSE);
  }
};

export default getHandler({ post });
