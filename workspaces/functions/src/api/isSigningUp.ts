import { getExpress, getFirebaseAdmin } from '../utils';

const app = getExpress();
const admin = getFirebaseAdmin();

app.post('/', async (request, response) => {
  const { idToken } = request.body;
  if (idToken) {
    const address = (await admin.auth().verifyIdToken(idToken)).uid;
    const isSigningUpRef = await admin.firestore().doc(`is-signing-up/${address}`).get();
    try {
      if (isSigningUpRef.exists) {
        const isSigningUp = isSigningUpRef.data();
        return response.send(isSigningUp);
      } else {
        return response.send({ isSigningUp: false });
      }
    } catch (error) {
      return response.status(401).send('');
    }
  }
  return response.status(401).send('');
});

export default app;
