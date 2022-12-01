import { Client } from 'twitter-api-sdk';
import { z } from 'zod';
import { Handler } from '../../types';
import { getHandler } from '../../utils';
import { getEnvironmentVariableErrorMessage } from 'libraries/utils';
import { ERROR_RESPONSE } from '../../consts';
import {
  getEarnCode,
  getUidServerSide,
  SocialShareCampaignData,
  SocialShareData,
  SocialShareTransactionData,
  UserPointsAccount,
} from 'libraries/models';
import {
  getCollectionReferenceServerSide,
  getDocumentData,
  getDocumentReferenceServerSide,
  getFirestoreServerSide,
} from 'libraries/firebase';
import { getTimeInsideWindow } from 'libraries/time';
import { FieldValue } from 'firebase-admin/firestore';
import { getDoesOwnToken } from 'libraries/blockchain/utils';
import { PINDER_MULTIPLE, PINDER_NFT_CONTRACT_ADDRESS } from 'consts';

const BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;

if (BEARER_TOKEN === undefined) {
  throw getEnvironmentVariableErrorMessage('TWITTER_BEARER_TOKEN');
}

const RequestBody = z.object({
  campaignId: z.string(),
  tweetUrl: z.string().url(),
});

const TwitterTweetData = z.object({
  data: z.object({
    author_id: z.string(),
    text: z.string(),
    entities: z
      .object({
        urls: z.array(z.object({ unwound_url: z.string() })).optional(),
        hashtags: z.array(z.object({ tag: z.string() })).optional(),
        mentions: z.array(z.object({ username: z.string() })).optional(),
      })
      .optional(),
  }),
});

const client = new Client(BEARER_TOKEN);

const post: Handler = async (req, res) => {
  try {
    const userId = await getUidServerSide(req);
    const { campaignId, tweetUrl } = RequestBody.parse(req.body);

    const socialShareId = getEarnCode(userId, campaignId);

    // Get user referral accounts document
    const userPointsAccountDocumentData = await getDocumentData<UserPointsAccount>(
      'user-points-accounts',
      userId
    );

    if (userPointsAccountDocumentData === undefined) {
      throw new Error(`User ${userId} does not have an user referral account.`);
    }

    const url = new URL(tweetUrl);

    const tweetId = url.pathname.split('/')[3];
    const tweet = await client.tweets.findTweetById(tweetId, {
      expansions: ['author_id'],
      'tweet.fields': ['entities'],
    });

    const {
      data: { author_id, text, entities },
    } = TwitterTweetData.parse(tweet);

    // reads & writes below must happen atomically
    // getting doc refs for everything needed in transaction

    const socialShareDocRef = await getDocumentReferenceServerSide<SocialShareData>(
      'social-shares',
      socialShareId
    );

    const socialShareCampaignDocRef = await getDocumentReferenceServerSide<SocialShareCampaignData>(
      'social-share-campaigns',
      campaignId
    );

    const socialUserWithVerifiedShareDocRef = await getDocumentReferenceServerSide(
      'social-share-campaigns',
      campaignId,
      'socialUsersWithVerifiedShare',
      author_id
    );

    const socialShareTransactionsCollectionRef = await getCollectionReferenceServerSide(
      'social-share-transactions'
    );

    const socialShareTransactionDocRef = socialShareTransactionsCollectionRef.doc();

    const userPointsAccountDocRef = await getDocumentReferenceServerSide(
      'user-points-accounts',
      userId
    );

    const userPointsEarnedTransactionsRef = await getDocumentReferenceServerSide(
      `user-points-accounts/${userId}/pointsEarnedTransactions`,
      socialShareTransactionDocRef.id
    );

    const firestore = await getFirestoreServerSide();

    await firestore.runTransaction(async (transaction) => {
      const socialShareDoc = await transaction.get(socialShareDocRef);
      const socialShareData = socialShareDoc.data();

      if (socialShareData === undefined) {
        throw new Error(`Social share with id ${socialShareId} does not exist in database.`);
      }

      const socialShareCampaignDoc = await transaction.get(socialShareCampaignDocRef);
      const socialShareCampaignData = socialShareCampaignDoc.data();

      if (socialShareCampaignData === undefined) {
        throw new Error(`Social share campaign with id ${campaignId} does not exist in database.`);
      }

      const {
        isActive,
        startDate,
        endDate,
        totalPointsEarned,
        totalPointsPool,
        requiredContent,
        pointsValue,
      } = socialShareCampaignData;

      // check campaign is active
      if (!isActive) {
        throw new Error(`Social share campaign (${campaignId}) is not currently active.`);
      }

      // check current time is between startDate and endDate
      const isInsideTimeWindow = getTimeInsideWindow(startDate, endDate);
      if (!isInsideTimeWindow) {
        throw new Error(
          `Social share campaign (${campaignId}) has not started yet or is already over.`
        );
      }

      // apply multiplier if eligible
      const doesOwnEthNft = await getDoesOwnToken(PINDER_NFT_CONTRACT_ADDRESS, userId, false);
      const appliedPointsValue = doesOwnEthNft ? pointsValue * PINDER_MULTIPLE : pointsValue;

      // ensures new total points earned doesn't exceed total points pool
      if (appliedPointsValue + totalPointsEarned > totalPointsPool) {
        throw new Error(
          `Max points (${totalPointsEarned}) awarded for social share campaign (${campaignId}).`
        );
      }

      const socialUserWithVerifiedShareDoc = await transaction.get(
        socialUserWithVerifiedShareDocRef
      );

      const socialUserWithVerifiedShareData = socialUserWithVerifiedShareDoc.data();

      if (socialUserWithVerifiedShareData !== undefined) {
        throw new Error(
          `Twitter user ${author_id} has already earned points for social share campaign (${campaignId})`
        );
      }

      // check if tweet includes social share id
      if (!text.includes(socialShareId)) {
        throw new Error(
          `Social share id ${socialShareId} is not included in tweet with url ${tweetUrl}.`
        );
      }

      // check required content
      const { usernames, urls, topics } = requiredContent;

      for (const username of usernames) {
        if (
          entities?.mentions === undefined ||
          entities.mentions.find((mention) => mention.username === username) === undefined
        ) {
          throw new Error(`Username @${username} is not included in tweet with url ${tweetUrl}.`);
        }
      }

      for (const url of urls) {
        if (
          entities?.urls === undefined ||
          entities.urls.find((twitterUrl) => twitterUrl.unwound_url === url) === undefined
        ) {
          console.log(entities?.urls);
          throw new Error(`Url ${url} is not included in tweet with url ${tweetUrl}.`);
        }
      }

      for (const topic of topics) {
        if (
          entities?.hashtags === undefined ||
          entities.hashtags.find((hashtag) => hashtag.tag === topic) === undefined
        ) {
          throw new Error(`Hashtag #${topic} is not included in tweet with url ${tweetUrl}.`);
        }
      }

      // update twitter value in shared socials to true
      transaction.update(socialShareDocRef, 'sharedSocials.twitter', true);

      const socialShareTransactionData: SocialShareTransactionData = {
        campaignId,
        pointsEarned: appliedPointsValue,
        timestamp: new Date().toISOString(),
        userId,
        social: 'twitter',
        socialShareId,
        url: tweetUrl,
      };

      transaction.set(socialShareTransactionDocRef, socialShareTransactionData);

      transaction.update(
        socialShareCampaignDocRef,
        'totalPointsEarned',
        FieldValue.increment(appliedPointsValue)
      );

      transaction.set(socialUserWithVerifiedShareDocRef, { hasVerifiedShare: true });

      transaction.update(
        userPointsAccountDocRef,
        'pointsBalance',
        FieldValue.increment(appliedPointsValue)
      );

      transaction.set(userPointsEarnedTransactionsRef, {
        pointsEarned: appliedPointsValue,
        social: 'twitter',
        shareCode: socialShareId,
        timestamp: socialShareTransactionData.timestamp,
      });
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json(ERROR_RESPONSE);
  }
  return res.status(200).send('');
};

export default getHandler({ post });
