import { getCollectionReferenceServerSide } from 'libraries/firebase';
import { ShippingInfo, shippingInfoSchema } from 'libraries/models';
import { ERROR_RESPONSE } from './consts';
import { Handler } from './types';
import { getHandler } from './utils';

const post: Handler = async (req, res) => {
  try {
    const shippingInfo: ShippingInfo = await shippingInfoSchema.validate(req.body);
    const shippingInfoCollectionRef = await getCollectionReferenceServerSide('shipping-info');

    const { id } = await shippingInfoCollectionRef.add(shippingInfo);

    return res.status(200).json({ id });
  } catch (e) {
    console.error(e);
    return res.status(500).json(ERROR_RESPONSE);
  }
};

export default getHandler({ post });
