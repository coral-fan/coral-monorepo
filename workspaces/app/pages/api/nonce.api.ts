import { isAddress } from '@ethersproject/address';
import { getDocumentReferenceServerSide } from 'libraries/firebase';
import { ERROR_RESPONSE } from './consts';
import { Handler } from './types';
import { getHandler, getNonce } from './utils';

const post: Handler = async (req, res) => {
  const { address } = req.body;
  if (!isAddress(address)) {
    return res.status(400).json({ error: 'Invalid address.' });
  }

  try {
    const nonceDocRef = await getDocumentReferenceServerSide('nonce', `${address}`);
    const nonceSnapshotDoc = await nonceDocRef.get();
    const nonceData = nonceSnapshotDoc.data();

    if (nonceData) {
      return res.json(nonceData);
    } else {
      const nonce = getNonce();
      nonceDocRef.set({ nonce });
      const isSigningUpDocRef = await getDocumentReferenceServerSide('is-signing-up', address);
      isSigningUpDocRef.set({ isSigningUp: true });
      return res.json({ nonce });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json(ERROR_RESPONSE);
  }
};

export default getHandler({ post });
