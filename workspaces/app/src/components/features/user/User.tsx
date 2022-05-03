import { Asset, getPublicUserData, PrivateUserData, User, useUserUid } from 'libraries/models';
import { GetServerSideProps } from 'next';
import { getDocumentData } from 'libraries/firebase';
import { getIdToken } from 'libraries/authentication';
import { destroyCookie } from 'nookies';
import { ID_TOKEN_KEY, SERVER_ENVIRONMENT } from 'consts';
import { getAuthenticationServerSide } from 'libraries/firebase/authentication';
import { UserPageProvider } from './provider';
import { UserProfile } from './components/UserProfile';
import { getAllOwnedTokenIds, getAssets } from 'libraries/models/asset/utils';
import { NextParsedUrlQuery } from 'next/dist/server/request-meta';
import { useEffect, useState } from 'react';

interface UserPageProps {
  userData: User;
}

export const UserPage = ({ userData }: UserPageProps) => {
  const uid = useUserUid();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isAssetsLoading, setIsAssetsLoading] = useState(true);

  useEffect(() => {
    const populateAssets = async (uid: string) => {
      const ownedTokensMap = await getAllOwnedTokenIds(uid);
      const assets: Asset[] = await getAssets(ownedTokensMap);
      setAssets(assets);
      setIsAssetsLoading(false);
    };
    uid && populateAssets(uid);
  }, [uid]);

  return (
    <UserPageProvider userData={userData}>
      <UserProfile isAssetsLoading={isAssetsLoading} assets={assets} />
    </UserPageProvider>
  );
};

interface UserParams extends NextParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps<UserPageProps, UserParams> = async (
  context
) => {
  //  TODO: remove conditional return for sign up campaign
  if (SERVER_ENVIRONMENT === 'production') {
    return {
      notFound: true,
    };
  }

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

  const userData: User = { ...publicUserData, ...privateUserData, assets: [], following: [] };

  return {
    props: {
      userData,
    },
  };
};
