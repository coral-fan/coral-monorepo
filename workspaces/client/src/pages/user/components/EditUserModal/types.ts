import { User } from 'libraries/models';
import { NullableString } from 'libraries/models/types';

type NonEditableUserFields = 'notifications' | 'assets';

export type UpdateUserProps = Omit<User, NonEditableUserFields | 'email'> & {
  email: NullableString;
};
