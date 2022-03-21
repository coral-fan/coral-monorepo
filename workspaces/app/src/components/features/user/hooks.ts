import { User, useUserUid } from 'libraries/models';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import { UserPageContext, SetUser, SetIsModalOpen } from './context';

const useUserPageContext = () => {
  const context = useContext(UserPageContext);
  if (context === undefined) {
    throw new Error('useUserPageContext must be used within a UserPageProvider');
  }
  return context;
};

export const useUser = (): [User, SetUser] => {
  const { user, setUser } = useUserPageContext();
  return [user, setUser];
};

export const useIsUpdateProfileInfoModalOpen = (): [boolean, SetIsModalOpen] => {
  const { isUpdateProfileInfoModalOpen, setIsUpdateProfileInfoModalOpen } = useUserPageContext();
  return [isUpdateProfileInfoModalOpen, setIsUpdateProfileInfoModalOpen];
};

export const useIsUpdateProfilePhotoModalOpen = (): [boolean, SetIsModalOpen] => {
  const { isUpdateProfilePhotoModalOpen, setIsUpdateProfilePhotoModalOpen } = useUserPageContext();
  return [isUpdateProfilePhotoModalOpen, setIsUpdateProfilePhotoModalOpen];
};

export const useIsCurrentUser = () => {
  const { userProfileId } = useRouter().query;

  if (typeof userProfileId !== 'string') {
    throw Error('userProfileId must be of type string');
  }

  const currentUserUid = useUserUid();

  return currentUserUid === userProfileId;
};
