import { getFirebaseAdmin } from 'libraries/firebase';
import { Handler } from './types';
import { getHandler } from './utils';

// this route format is necessary becasue rewrite done remove source: https://stackoverflow.com/questions/64916582/firebase-functions-return-404
const post: Handler = async (req, res) => {
  const { idToken } = req.body;
  if (idToken) {
    const admin = await getFirebaseAdmin();
    const address = (await admin.auth().verifyIdToken(idToken)).uid;
    const isSigningUpRef = await admin.firestore().doc(`is-signing-up/${address}`).get();
    try {
      if (isSigningUpRef.exists) {
        const isSigningUp = isSigningUpRef.data();
        return res.send(isSigningUp);
      } else {
        return res.send({ isSigningUp: false });
      }
    } catch (error) {
      console.log(error);
      return res.status(401).send('');
    }
  }
  return res.status(401).send('');
};

export default getHandler({ post });
