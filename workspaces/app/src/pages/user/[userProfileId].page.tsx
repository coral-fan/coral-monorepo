import { PrivateUserData, PublicUserData, User } from 'libraries/models';
import { GetServerSideProps } from 'next';
import { getDocumentData } from 'libraries/firebase';
import { getIdToken } from 'libraries/authentication';
import { destroyCookie } from 'nookies';
import { ID_TOKEN_KEY } from 'consts';
import { getAuthenticationServerSide } from 'libraries/firebase/authentication';
import { UserPageProvider } from './provider';
import { UserProfile } from './components/UserProfile';

interface UserPageProps {
  userData: User;
}

export default function UserPage({ userData }: UserPageProps) {
  return (
    <UserPageProvider initialUserData={userData}>
      <UserProfile />
    </UserPageProvider>
  );
}

export const getServerSideProps: GetServerSideProps<
  UserPageProps,
  { userProfileId: string }
> = async (context) => {
  const { params } = context;

  if (params === undefined) {
    return {
      notFound: true,
    };
  }

  const { userProfileId } = params;
  const publicUserData = await getDocumentData<PublicUserData>('users', userProfileId);

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
    authenticatedUserUid === userProfileId
      ? await getDocumentData<PrivateUserData>('users', userProfileId, 'private', 'data')
      : undefined;

  const userData: User = { ...publicUserData, ...privateUserData };

  return {
    props: {
      userData,
    },
  };
};
