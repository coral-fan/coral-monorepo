import { User } from 'libraries/firebase';

export type EditUserProps = Omit<User, 'creditCardInformation' | 'notifications' | 'assets'>