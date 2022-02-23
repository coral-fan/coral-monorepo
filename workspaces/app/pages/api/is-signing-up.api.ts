import { isAddress } from '@ethersproject/address';
import { getAuth } from 'firebase-admin/auth';
import { getDocumentReferenceServerSide } from 'libraries/firebase';
import { ERROR_RESPONSE } from './consts';
import { Handler } from './types';
import { getHandler } from './utils';

const post: Handler = async (req, res) => {
  const token = req.cookies['id_token'];

  if (token === undefined) {
    return res.status(400).json({ error: 'Invalid ID token.' });
  }

  const auth = getAuth();

  const { uid } = await auth.verifyIdToken(token);

  if (!isAddress(uid)) {
    return res.status(400).json({ error: 'Invalid UID' });
  }

  const { isSigningUp } = req.body;

  if (typeof isSigningUp !== 'boolean') {
    return res.status(400).json({ error: 'Invalid isSigningUp value.' });
  }

  try {
    const isSigningUpDocRef = await getDocumentReferenceServerSide('is-signing-up', uid);
    isSigningUpDocRef.set({ isSigningUp });
    return res.status(200).send('');
  } catch (error) {
    console.error(error);
    return res.status(500).json(ERROR_RESPONSE);
  }
};

export default getHandler({ post });
