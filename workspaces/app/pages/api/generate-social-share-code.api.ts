import { getDocumentData, getDocumentReferenceServerSide } from 'libraries/firebase';
import {
  getEarnCode,
  getUidServerSide,
  SharedSocials,
  SocialShareCampaignData,
  SocialShareData,
} from 'libraries/models';
import { z } from 'zod';
import { ERROR_RESPONSE } from './consts';
import { Handler } from './types';
import { getHandler } from './utils';

const GenerateSocialShareCodeRequestBody = z.object({
  campaignId: z.string(),
});

const post: Handler = async (req, res) => {
  const { campaignId } = GenerateSocialShareCodeRequestBody.parse(req.body);

  try {
    const uid = await getUidServerSide(req);
    const socialShareCode = getEarnCode(uid, campaignId);

    const socialShareDocRef = await getDocumentReferenceServerSide<SocialShareData>(
      'social-shares',
      socialShareCode
    );

    const socialShareDocSnapshot = await socialShareDocRef.get();

    const socialShareCampaignData = await getDocumentData<SocialShareCampaignData>(
      'social-share-campaigns',
      campaignId
    );

    if (!socialShareCampaignData) {
      throw new Error(`Social share campaignId ${campaignId} not found`);
    }

    const socialPlatforms = socialShareCampaignData.socials;

    const sharedSocials = {} as SharedSocials;

    for (const socialPlatform of socialPlatforms) {
      sharedSocials[socialPlatform] = false;
    }

    if (!socialShareDocSnapshot.exists) {
      socialShareDocRef.set({
        campaignId,
        userId: uid,
        createdAt: new Date().toISOString(),
        sharedSocials,
      });

      const userPointsAccountsDocRef = await getDocumentReferenceServerSide(
        'user-points-accounts',
        uid
      );

      const userPointsAccountsDocSnapshot = await userPointsAccountsDocRef.get();

      if (!userPointsAccountsDocSnapshot.exists) {
        userPointsAccountsDocRef.set({ pointsBalance: 0 });
      }

      return res.status(200).send({ socialShareCode });
    } else {
      throw new Error(
        `Social share code for user with id ${uid} for campaign ${campaignId} already exists`
      );
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json(ERROR_RESPONSE);
  }
};

export default getHandler({ post });
