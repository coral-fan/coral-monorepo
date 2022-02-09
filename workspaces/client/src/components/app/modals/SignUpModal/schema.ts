import { object, InferType } from 'yup';
import { getUsernameSchema, EMAIL_SCHEMA, DOES_AGREE_SCHEMA } from 'libraries/utils/schemas';

export const getSignUpSchema = (usernames: Set<string>) =>
  object({
    username: getUsernameSchema(usernames),
    email: EMAIL_SCHEMA,
    doesAgree: DOES_AGREE_SCHEMA,
  });

export type SignUpSchema = InferType<ReturnType<typeof getSignUpSchema>>;
