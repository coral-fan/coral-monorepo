import { User } from 'libraries/models';
import { NullableString } from 'libraries/models/types';

type NonEditableUserFields = 'notifications' | 'assets';

export type EditUserProps = Omit<User, NonEditableUserFields | 'email'> & {
  email: NullableString;
};
