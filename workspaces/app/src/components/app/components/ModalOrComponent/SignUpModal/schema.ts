import { object, InferType, boolean } from 'yup';
import { getUsernameSchema, EMAIL_SCHEMA } from 'libraries/utils/schemas';

export const getSignUpSchema = (usernames: Set<string>) =>
  object({
    username: getUsernameSchema(usernames),
    email: EMAIL_SCHEMA,
    doesAgree: boolean().required().default(false).isTrue(),
    // TODO: revert default to false post sign up campaign
    doesOptIntoMarketing: boolean().required().default(true),
  });

export type SignUpSchema = InferType<ReturnType<typeof getSignUpSchema>>;
