import { NextApiRequest, NextApiResponse } from 'next/types';
import { ERROR_RESPONSE } from '../consts';
import { getHandler } from '../utils';
import { Handler } from '../types';
import { object, string } from 'yup';
import { getUidServerSide } from 'libraries/models';
import { relayMint } from './utils';

export const mintFreeNftParamsSchema = object({
  collectionId: string().required(),
});

export const post: Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { collectionId } = await mintFreeNftParamsSchema.validate(req.body);

    const uid = await getUidServerSide(req);

    const transactionHash = await relayMint(collectionId, uid);

    const response = { transactionHash };

    return res.status(200).send(response);
  } catch (e) {
    console.error(e);
  }
  return res.status(500).send(ERROR_RESPONSE);
};

export default getHandler({ post });
