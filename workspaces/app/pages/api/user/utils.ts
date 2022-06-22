import { SIGN_UP_CAMPAIGN_MAX_OPENINGS } from 'consts';
import { getDocumentData, getDocumentReferenceServerSide } from 'libraries/firebase';
import { IncomingUserData, PrivateUserData, PublicUserData, User } from 'libraries/models';
import { USER_PROPERTIES, PRIVATE_USER_DATA_PROPERTIES } from './consts';

interface EarlySignUpCampaignData {
  userUids: User['id'][];
}

const extractData = <T, U>(data: T, keys: Set<keyof U>): Partial<T> =>
  Object.entries(data).reduce(
    (extractedData, [key, value]) =>
      // casting to prevent TS from throwing a hissy fit about Argument of type 'string' is not assignable to parameter of type 'keyof U'
      keys.has(key as keyof U) ? { ...extractedData, [key]: value } : extractedData,
    {}
  );
const isObjectEmpty = (object: Record<string, unknown>) => Object.keys(object).length === 0;

type DefaultPublicUserData = Omit<PublicUserData, 'id' | 'username'>;

const DEFAULT_PUBLIC_USER_DATA: DefaultPublicUserData = {
  type: 'fan',
  profilePhoto: {
    src: '/images/default-profile-photo.png',
    offsetPercentages: [0, 0],
    scale: 1,
  },
  bio: null,
  socialHandles: {},
  notifications: [],
  followingArtistIds: [],
};

type DefaultPrivateUserData = Omit<PrivateUserData, 'doesOptIntoMarketing'>;

const DEFAULT_PRIVATE_USER_DATA: DefaultPrivateUserData = {
  email: null,
  stripeCustomerId: null,
  shippingInfoId: null,
};

export const upsertUser = async (uid: string, incomingUserData: IncomingUserData) => {
  const userData = extractData(incomingUserData, USER_PROPERTIES);

  if (!isObjectEmpty(userData)) {
    const userDocRef = await getDocumentReferenceServerSide('users', uid);
    const userDocSnapshot = await userDocRef.get();

    // TODO: remove sign up campaign logic
    // logic starts here
    if (!userDocSnapshot.exists) {
      const signUpCampaignDocRef = await getDocumentReferenceServerSide(
        'app',
        'early-sign-up-campaign'
      );

      const signUpCampaignData = await getDocumentData<EarlySignUpCampaignData>(
        'app',
        'early-sign-up-campaign'
      );

      if (signUpCampaignData) {
        const { userUids } = signUpCampaignData;
        if (userUids.length < SIGN_UP_CAMPAIGN_MAX_OPENINGS) {
          signUpCampaignDocRef.set({ userUids: [...userUids, uid] });
        }
      }
    }
    // logic ends here
    await userDocRef.set(
      userDocSnapshot.exists
        ? userData
        : {
            ...DEFAULT_PUBLIC_USER_DATA,
            ...userData,
          },
      { merge: true }
    );
  }

  const privateUserData = extractData<IncomingUserData, PrivateUserData>(
    incomingUserData,
    PRIVATE_USER_DATA_PROPERTIES
  );

  if (!isObjectEmpty(privateUserData)) {
    const privateUserDataDocRef = await getDocumentReferenceServerSide(
      'users',
      uid,
      'private',
      'data'
    );

    const privateUserDataDocSnapshot = await privateUserDataDocRef.get();
    await privateUserDataDocRef.set(
      privateUserDataDocSnapshot.exists
        ? privateUserData
        : {
            ...DEFAULT_PRIVATE_USER_DATA,
            ...privateUserData,
          },
      { merge: true }
    );
  }
};
