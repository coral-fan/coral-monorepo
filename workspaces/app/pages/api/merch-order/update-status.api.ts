import { MerchOrder } from 'libraries/models';
import { mixed, object, string } from 'yup';
import { ERROR_RESPONSE } from '../consts';
import { Handler } from '../types';
import { getHandler } from '../utils';
import { updateMerchOrderStatus } from './utils';

const updateMerchOrderApiSchema = object({
  merchOrderId: string().required(),
  status: mixed<MerchOrder['status']>().oneOf(['confirmed', 'rejected']).required(),
});

const post: Handler = async (req, res) => {
  try {
    const { merchOrderId, status } = await updateMerchOrderApiSchema.validate(req.body);

    const writeTime = await updateMerchOrderStatus(merchOrderId, status);

    return res.status(200).json({ writeTime });
  } catch (e) {
    console.error(e);
    return res.status(500).json(ERROR_RESPONSE);
  }
};

export default getHandler({ post });
