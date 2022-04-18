import { Asset, PrivateUserData, PublicUserData, User } from 'libraries/models';
import { GetServerSideProps } from 'next';
import { getDocumentData } from 'libraries/firebase';
import { getIdToken } from 'libraries/authentication';
import { destroyCookie } from 'nookies';
import { ID_TOKEN_KEY, SERVER_ENVIRONMENT } from 'consts';
import { getAuthenticationServerSide } from 'libraries/firebase/authentication';
import { UserPageProvider } from './provider';
import { UserProfile } from './components/UserProfile';
import { IMAGE_WITH_INFO_DEFAULT_ARGS } from 'components/ui/nft/components/ImageWithInfo/consts';

interface UserPageProps {
  userData: User;
}

export const UserPage = ({ userData }: UserPageProps) => {
  const { assets } = userData;
  return (
    <UserPageProvider userData={userData}>
      <UserProfile assets={assets} />
    </UserPageProvider>
  );
};

export const getServerSideProps: GetServerSideProps<UserPageProps, { id: string }> = async (
  context
) => {
  const { params } = context;

  if (params === undefined) {
    return {
      notFound: true,
    };
  }

  const { id } = params;
  const publicUserData = await getDocumentData<PublicUserData>('users', id);

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

  const assets: Asset[] =
    SERVER_ENVIRONMENT === 'production'
      ? []
      : [
          {
            id: 3671,
            contractAddress: '1',
            collectionName: 'Bonobo',
            ownerUsername: publicUserData.username,
            ownerAddress: id,
            ownerType: 'fan',
            ownerProfilePhoto: publicUserData.profilePhoto,
            gatedContent: {
              type: 'url',
              url: '/',
            },
            type: 'music',
            collectionDescription:
              'Exclusive access to a one on one call with me between recording sessions on my next album. With this token you’ll get 30 minutes of solo time with me and the band.',
            collectionDetails: null,
            ...IMAGE_WITH_INFO_DEFAULT_ARGS,
          },
          {
            id: 9,
            contractAddress: '1',
            collectionName: 'Behind the Scenes Studio Tour',
            ownerUsername: publicUserData.username,
            ownerAddress: id,
            ownerType: 'fan',
            ownerProfilePhoto: publicUserData.profilePhoto,
            gatedContent: {
              type: 'url',
              url: '/',
            },
            type: 'music',
            collectionDescription:
              'Exclusive access to a one on one call with me between recording sessions on my next album. With this token you’ll get 30 minutes of solo time with me and the band.',
            collectionDetails: null,
            ...IMAGE_WITH_INFO_DEFAULT_ARGS,
          },
          {
            id: 9732,
            contractAddress: '2',
            collectionName: 'Access Tour: This is an Extra Long Title',
            ownerUsername: publicUserData.username,
            ownerAddress: id,
            ownerType: 'fan',
            ownerProfilePhoto: publicUserData.profilePhoto,
            gatedContent: {
              type: 'url',
              url: '/',
            },
            type: 'merch',
            collectionDescription:
              'Exclusive access to a one on one call with me between recording sessions on my next album. With this token you’ll get 30 minutes of solo time with me and the band.',
            collectionDetails: null,
            ...IMAGE_WITH_INFO_DEFAULT_ARGS,
          },
          {
            id: 234,
            contractAddress: '3',
            collectionName: 'This Is An Event',
            ownerUsername: publicUserData.username,
            ownerAddress: id,
            ownerType: 'fan',
            ownerProfilePhoto: publicUserData.profilePhoto,
            gatedContent: {
              type: 'url',
              url: '/',
            },
            type: 'event',
            collectionDescription:
              'Exclusive access to a one on one call with me between recording sessions on my next album. With this token you’ll get 30 minutes of solo time with me and the band.',
            collectionDetails: null,
            ...IMAGE_WITH_INFO_DEFAULT_ARGS,
          },
        ];

  const userData: User = { ...publicUserData, ...privateUserData, assets, following: [] };

  return {
    props: {
      userData,
    },
  };
};
