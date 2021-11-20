import { getExpress, getFirebaseAdmin } from '../utils';

const app = getExpress();
const admin = getFirebaseAdmin();

// this route format is necessary becasue rewrite done remove source: https://stackoverflow.com/questions/64916582/firebase-functions-return-404
app.post('/api/is-signing-up', async (request, response) => {
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
