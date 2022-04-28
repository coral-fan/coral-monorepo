import { PrelaunchSignUpCampaignData } from 'components/features/sign-up-campaign/types';
import { SERVER_ENVIRONMENT, SIGN_UP_CAMPAIGN_MAX_OPENINGS } from 'consts';
import { getDocumentData, getDocumentReferenceServerSide } from 'libraries/firebase';
import { IncomingUserData, PrivateUserData, PublicUserData } from 'libraries/models';
import { USER_PROPERTIES, PRIVATE_USER_DATA_PROPERTIES } from './consts';

const extractData = <T, U>(data: T, keys: Set<keyof U>): Partial<T> =>
  Object.entries(data).reduce(
    (extractedData, [key, value]) =>
      // casting to prevent TS from throwing a hissy fit about Argument of type 'string' is not assignable to parameter of type 'keyof U'
      keys.has(key as keyof U) ? { ...extractedData, [key]: value } : extractedData,
    {}
  );
const isObjectEmpty = (object: Record<string, unknown>) => Object.keys(object).length === 0;

const DEFAULT_PROFILE_PHOTO_SRC =
  SERVER_ENVIRONMENT === 'production'
    ? 'https://firebasestorage.googleapis.com/v0/b/coral-fan.appspot.com/o/users%2Fdefault%2Fprofile-photo.png?alt=media&token=877096c6-9f69-4d3a-ba25-1f47b6682209'
    : 'https://firebasestorage.googleapis.com/v0/b/coral-c373f.appspot.com/o/users%2Fdefault%2Fprofile-photo.png?alt=media&token=704a0037-c763-4685-b998-1682cce9f64f';

type DefaultPublicUserData = Omit<PublicUserData, 'id' | 'username'>;

const DEFAULT_PUBLIC_USER_DATA: DefaultPublicUserData = {
  type: 'fan',
  profilePhoto: {
    src: DEFAULT_PROFILE_PHOTO_SRC,
    offsetPercentages: [0, 0],
    scale: 1,
  },
  bio: null,
  socialHandles: {},
  notifications: [],
  assets: {},
  following: [],
};

type DefaultPrivateUserData = Omit<PrivateUserData, 'doesOptIntoMarketing'>;

const DEFAULT_PRIVATE_USER_DATA: DefaultPrivateUserData = {
  creditCardInformation: null,
  email: null,
};

export const upsertUser = async (uid: string, incomingUserData: IncomingUserData) => {
  const userData = extractData(incomingUserData, USER_PROPERTIES);

  if (!isObjectEmpty(userData)) {
    const userDocRef = await getDocumentReferenceServerSide('users', uid);
    const userDocSnapshot = await userDocRef.get();

    // TODO: remove sign up campaign logic
    // logic starts here
    if (!userDocSnapshot.exists) {
      const signupCampaignDocRef = await getDocumentReferenceServerSide(
        'app',
        'prelaunch-sign-up-campaign'
      );

      const signupCampaignData = await getDocumentData<PrelaunchSignUpCampaignData>(
        'app',
        'prelaunch-sign-up-campaign'
      );

      if (signupCampaignData) {
        const { users } = signupCampaignData;
        if (users.length < SIGN_UP_CAMPAIGN_MAX_OPENINGS) {
          signupCampaignDocRef.set({ users: [...users, uid] });
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
