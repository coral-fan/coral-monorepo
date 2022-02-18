import { User } from 'libraries/models';
import { FC, useState } from 'react';
import { UserPageContext } from './context';

interface UserPageProviderProps {
  initialUserData: User;
}

export const UserPageProvider: FC<UserPageProviderProps> = ({ initialUserData, children }) => {
  const [user, setUser] = useState(initialUserData);
  const [isUpdateProfileInfoModalOpen, setIsUpdateProfileInfoModalOpen] = useState(false);
  const [isUpdateProfilePhotoModalOpen, setIsUpdateProfilePhotoModalOpen] = useState(false);

  const value = {
    user,
    setUser,
    isUpdateProfileInfoModalOpen,
    setIsUpdateProfileInfoModalOpen,
    isUpdateProfilePhotoModalOpen,
    setIsUpdateProfilePhotoModalOpen,
  };

  return <UserPageContext.Provider value={value}>{children}</UserPageContext.Provider>;
};
