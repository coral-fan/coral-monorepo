import { Asset, getPublicUserData, PrivateUserData, User } from 'libraries/models';
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
import { useCallback, useEffect, useState } from 'react';
interface UserPageProps {
  userData: User;
}

export const UserPage = ({ userData }: UserPageProps) => {
  const { id, assets } = userData;
  const [currentAssets, setCurrentAssets] = useState<Asset[]>(assets);
  const [isAssetsLoading, setIsAssetsLoading] = useState(true);

  const populateAssets = useCallback(async (walletAddress: string) => {
    const ownedTokensMap = await getAllOwnedTokenIds(walletAddress);
    const currentAssets: Asset[] = await getAssets(ownedTokensMap);
    setCurrentAssets(currentAssets);
    setIsAssetsLoading(false);
  }, []);

  // TODO: Handle assets in DB
  useEffect(() => {
    populateAssets(id);
  }, [populateAssets, id]);

  return (
    <UserPageProvider userData={userData}>
      <UserProfile isAssetsLoading={isAssetsLoading} assets={currentAssets} />
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

  // TODO: Store Assets in DB, update on each page load
  const userData: User = { id, ...publicUserData, ...privateUserData, assets: [], following: [] };

  return {
    props: {
      userData,
    },
  };
};
