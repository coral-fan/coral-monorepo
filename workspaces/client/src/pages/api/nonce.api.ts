import { isAddress } from '@ethersproject/address';
import { getDocumentReferenceServerSide } from 'libraries/firebase';
import { Handler } from './types';
import { getHandler } from './utils';
import { getNonce } from './utils/nonce';

const post: Handler = async (req, res) => {
  const { address } = req.body;
  if (!isAddress(address)) {
    return res.status(400).json({ error: 'Address is not valid.' });
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
    console.log(error);
    return res.status(500).json({ error: 'An error occured.' });
  }
};

export default getHandler({ post });
