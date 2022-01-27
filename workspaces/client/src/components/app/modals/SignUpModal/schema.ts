import { boolean, object, string, InferType } from 'yup';

export const getSignUpSchema = (usernames: Set<string>) =>
  object({
    username: string()
      .required()
      .min(3)
      .matches(/^([a-zA-Z\d_])+$/g, 'Only alphanumeric characters and _ are allowed')
      .test({
        name: 'is-username-unique',
        test: (username) => username !== undefined && !usernames.has(username.toLowerCase()),
        message: 'Username is taken',
      }),
    email: string()
      .email()
      .optional()
      .transform((value: string) => (value === '' ? undefined : value)),
    doesAgree: boolean().required().default(false).isTrue(),
  });

export type SignUpSchema = InferType<ReturnType<typeof getSignUpSchema>>;
