import { User } from 'libraries/models';
import { createContext, Dispatch, SetStateAction } from 'react';

export type SetIsModalOpen = Dispatch<SetStateAction<boolean>>;
export type SetUser = Dispatch<SetStateAction<User>>;

export interface UserPageContext {
  user: User;
  setUser: SetUser;
  isUpdateProfileInfoModalOpen: boolean;
  setIsUpdateProfileInfoModalOpen: SetIsModalOpen;
  isUpdateProfilePhotoModalOpen: boolean;
  setIsUpdateProfilePhotoModalOpen: SetIsModalOpen;
}

export const UserPageContext = createContext<undefined | UserPageContext>(undefined);
