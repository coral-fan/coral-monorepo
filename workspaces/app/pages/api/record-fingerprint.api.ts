import { Handler } from './types';
import { z } from 'zod';
import { ERROR_RESPONSE } from './consts';
import { getBatch, getDocumentReferenceServerSide } from 'libraries/firebase';
import { getHandler } from './utils';
import { ReferralData } from 'libraries/models';
import { FieldValue } from 'firebase-admin/firestore';

const RecordFingerprintRequestBody = z.object({
  referralCode: z.string(),
  fingerprint: z.string(),
  referrer: z.string(),
});

const post: Handler = async (req, res) => {
  try {
    const { referralCode, fingerprint, referrer } = RecordFingerprintRequestBody.parse(req.body);
    const referralCodeDocRef = await getDocumentReferenceServerSide<ReferralData>(
      'referrals',
      referralCode
    );
    const referralCodeSnapshot = await referralCodeDocRef.get();
    const referralCodeData = referralCodeSnapshot.data();

    if (referralCodeData === undefined) {
      throw new Error(`Referral code ${referralCode} isn't in database.`);
    }

    const fingerprintDocumentRef = await getDocumentReferenceServerSide(
      'fingerprints',
      fingerprint
    );

    await fingerprintDocumentRef.set({
      referralCode,
      referrer,
    });

    const { seenFingerprints } = referralCodeData;

    const batch = await getBatch();

    if (seenFingerprints.indexOf(fingerprint) < 0) {
      batch.update(referralCodeDocRef, {
        seenFingerprints: FieldValue.arrayUnion(fingerprint),
        uniqueVisits: FieldValue.increment(1),
      });
    }

    batch.update(referralCodeDocRef, {
      visits: FieldValue.increment(1),
    });

    await batch.commit();
  } catch (e) {
    console.error(e);
    return res.status(500).json(ERROR_RESPONSE);
  }

  return res.status(200).send('');
};

export default getHandler({ post });
