import { isAddress } from '@ethersproject/address';
import { verifyMessage } from '@ethersproject/wallet';
import { getAuth } from 'firebase-admin/auth';
import { getAuthenticationMessage } from 'libraries/authentication';
import { getDocumentReferenceServerSide } from 'libraries/firebase';
import { ERROR_RESPONSE } from './consts';
import { Handler } from './types';
import { getHandler, getNonce } from './utils';

const post: Handler = async (req, res) => {
  const { address, signedMessage } = req.body;
  if (!isAddress(address)) {
    return res.status(400).json({ error: 'Address is not valid.' });
  }
  try {
    const nonceRefDoc = await getDocumentReferenceServerSide('nonce', `${address}`);
    const nonceSnapshotDoc = await nonceRefDoc.get();
    const nonceData = nonceSnapshotDoc.data();
    if (nonceData) {
      const { nonce } = nonceData;
      const derivedAddress = verifyMessage(getAuthenticationMessage(nonce), signedMessage);
      if (address === derivedAddress) {
        const nextNonce = getNonce();
        await nonceRefDoc.set({ nonce: nextNonce });
        const token = await getAuth().createCustomToken(derivedAddress);
        return res.status(200).json({ token });
      } else {
        return res.status(400).json({ error: 'Signed message verification failed.' });
      }
    } else {
      return res.status(400).json({ error: 'Address is not valid.' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json(ERROR_RESPONSE);
  }
};

export default getHandler({ post });
