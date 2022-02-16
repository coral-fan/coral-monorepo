import { User } from 'libraries/models';
import { useContext } from 'react';
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
