import { bool, string } from 'yup';

export const getUsernameSchema = (usernames: Set<string>, currentUsername?: string) => {
  return string()
    .required()
    .min(3)
    .max(15)
    .matches(/^([a-zA-Z\d_])+$/g, 'Only alphanumeric characters and _ are allowed')
    .test({
      name: 'is-username-unique',
      test: (username) => {
        if (username === undefined) {
          return false;
        }
        username = username.toLowerCase();
        const isUsernameTaken = usernames.has(username);
        const isUsernameSame = username === currentUsername?.toLowerCase();
        return !isUsernameTaken || isUsernameSame;
      },
      message: 'Username is taken',
    });
};

export const EMAIL_SCHEMA = string()
  .email()
  .transform((value: string) => (value === '' ? null : value))
  .nullable();

export const BIO_SCHEMA = string().nullable().max(280);

export const SOCIAL_HANDLE_SCHEMA = string()
  .min(3)
  .matches(
    /^([a-zA-Z\d_])+$/g,
    'Only alphanumeric characters and _ are allowed, no @ symbol necessary'
  )
  .transform((value: string) => (value === '' ? undefined : value));

export const FIRST_NAME_SCHEMA = string().required().max(40);
export const LAST_NAME_SCHEMA = string().required().max(40);
export const ADDRESS_LINE_ONE_SCHEMA = string().required().max(100);
export const ADDRESS_LINE_TWO_SCHEMA = string().max(100);
export const CITY_SCHEMA = string().required().max(100);
export const STATE_SCHEMA = string().required();
export const POSTAL_CODE_SCHEMA = string().required().length(5);
export const SAVE_SHIPPING_INFO_SCHEMA = bool().required();
