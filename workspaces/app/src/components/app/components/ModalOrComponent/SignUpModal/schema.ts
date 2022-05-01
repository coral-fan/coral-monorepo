import { object, InferType, boolean } from 'yup';
import { getUsernameSchema, EMAIL_SCHEMA } from 'libraries/utils/schemas';

export const getSignUpSchema = (usernames: Set<string>) =>
  object({
    username: getUsernameSchema(usernames),
    email: EMAIL_SCHEMA,
    // TODO: revert default to false post sign up campaign
    doesAgree: boolean().required().default(true).isTrue(),
    doesOptIntoMarketing: boolean().required().default(false),
  });

export type SignUpSchema = InferType<ReturnType<typeof getSignUpSchema>>;
