import { Handler } from './types';
import { z } from 'zod';
import { ERROR_RESPONSE } from './consts';
import { getDocumentData, getDocumentReferenceServerSide } from 'libraries/firebase';
import { getHandler } from './utils';
import { ReferralData } from 'libraries/models';

const RecordFingerprintRequestBody = z.object({
  referralCode: z.string(),
  fingerprint: z.string(),
  referrer: z.string(),
});

const post: Handler = async (req, res) => {
  try {
    const { referralCode, fingerprint, referrer } = RecordFingerprintRequestBody.parse(req.body);
    const referralCodeDocumentData = await getDocumentData<ReferralData>('referrals', referralCode);

    if (!referralCodeDocumentData) {
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
  } catch (e) {
    console.error(e);
    return res.status(500).json(ERROR_RESPONSE);
  }

  return res.status(200).send('');
};

export default getHandler({ post });
