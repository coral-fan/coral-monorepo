import { getPublicUserData, OwnedNfts, PrivateUserData, User } from 'libraries/models';
import { GetServerSideProps } from 'next';
import { getDocumentData } from 'libraries/firebase';
import { getIdToken } from 'libraries/authentication';
import { destroyCookie } from 'nookies';
import { ID_TOKEN_KEY } from 'consts';
import { getAuthenticationServerSide } from 'libraries/firebase/authentication';
import { UserPageProvider } from './provider';
import { UserProfile } from './components/UserProfile';
import { NextParsedUrlQuery } from 'next/dist/server/request-meta';
import { getAssets } from 'libraries/models/asset/utils';
interface UserPageProps {
  userData: User;
  doesUserHaveUnclaimedReward: boolean;
}

export const UserPage = ({ userData, doesUserHaveUnclaimedReward }: UserPageProps) => {
  // TODO: look to see if asssets can be used from context instead
  const { assets } = userData;

  return (
    <UserPageProvider userData={userData}>
      <UserProfile assets={assets} doesUserHaveUnclaimedReward={doesUserHaveUnclaimedReward} />
    </UserPageProvider>
  );
};

interface UserParams extends NextParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps<UserPageProps, UserParams> = async (
  context
) => {
  const { params } = context;

  if (params === undefined) {
    return {
      notFound: true,
    };
  }

  const { id } = params;
  const publicUserData = await getPublicUserData(id);

  if (publicUserData === undefined) {
    return {
      notFound: true,
    };
  }

  const auth = await getAuthenticationServerSide();

  const token = getIdToken(context);

  const authenticatedUserUid =
    token === null
      ? undefined
      : (
          await auth.verifyIdToken(token).catch(() => {
            destroyCookie(context, ID_TOKEN_KEY);
          })
        )?.uid;

  const privateUserData =
    authenticatedUserUid === id
      ? await getDocumentData<PrivateUserData>('users', id, 'private', 'data')
      : undefined;

  const ownedNfts = (await getDocumentData<OwnedNfts>('nft-ownership', id)) ?? {};

  const assets = ownedNfts ? await getAssets(id, ownedNfts) : [];

  const { followingArtistIds, ...partialPublicUserData } = publicUserData;

  // const unclaimedRewards = await getDocumentData<{ userIds: string[] }>(
  //   'app',
  //   'unclaimed-early-sign-up-rewards'
  // );

  // if (unclaimedRewards === undefined) {
  //   throw new Error('document app/unclaimed-early-sign-up-rewards cannot be undefined');
  // }

  // const doesUserHaveUnclaimedReward =
  //   unclaimedRewards.userIds.find(
  //     (userWithUnclaimedRewardId) => userWithUnclaimedRewardId === id
  //   ) !== undefined;

  const doesUserHaveUnclaimedReward = false;

  // TODO: Add real following logic
  const followingArtists = followingArtistIds.length > 0 ? [] : [];

  // TODO: Store Assets in DB, update on each page load
  const userData: User = {
    id,
    ...partialPublicUserData,
    ...privateUserData,
    followingArtists,
    assets,
  };

  return {
    props: {
      userData,
      doesUserHaveUnclaimedReward,
    },
  };
};
