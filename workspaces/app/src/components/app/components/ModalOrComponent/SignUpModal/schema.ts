import { object, InferType, boolean } from 'yup';
import { getUsernameSchema, EMAIL_SCHEMA } from 'libraries/utils/schemas';

export const getSignUpSchema = (usernames: Set<string>) =>
  object({
    username: getUsernameSchema(usernames),
    email: EMAIL_SCHEMA,
    doesAgree: boolean().required().isTrue(),
    doesOptIntoMarketing: boolean().required(),
  });

export type SignUpSchema = InferType<ReturnType<typeof getSignUpSchema>>;
