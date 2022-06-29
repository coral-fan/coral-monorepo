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
