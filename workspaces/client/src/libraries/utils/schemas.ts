import { boolean, string } from 'yup';

export const getUsernameSchema = (usernames: Set<string>) =>
  string()
    .required()
    .min(3)
    .matches(/^([a-zA-Z\d_])+$/g, 'Only alphanumeric characters and _ are allowed')
    .test({
      name: 'is-username-unique',
      test: (username) => username !== undefined && !usernames.has(username.toLowerCase()),
      message: 'Username is taken',
    });

export const email = string()
  .email()
  .transform((value: string) => (value === '' ? null : value))
  .nullable();

export const doesAgree = boolean().required().default(false).isTrue();
