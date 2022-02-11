import { boolean, string } from 'yup';

export const getUsernameSchema = (usernames: Set<string>, currentUsername?: string) => {
  return string()
    .required()
    .min(3)
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

export const DOES_AGREE_SCHEMA = boolean().required().default(false).isTrue();
