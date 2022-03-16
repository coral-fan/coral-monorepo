import { User } from 'libraries/models';
import { FC, useEffect, useState } from 'react';
import { UserPageContext } from './context';

interface UserPageProviderProps {
  userData: User;
}

export const UserPageProvider: FC<UserPageProviderProps> = ({ userData, children }) => {
  const [user, setUser] = useState(userData);

  useEffect(() => {
    setUser(userData);
  }, [userData]);

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
