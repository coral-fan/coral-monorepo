import { User } from 'libraries/models';

export type EditUserProps = Omit<User, 'creditCardInformation' | 'notifications' | 'assets'>;
