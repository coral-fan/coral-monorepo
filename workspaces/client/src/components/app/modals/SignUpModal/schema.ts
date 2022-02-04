import { object, InferType } from 'yup';
import { getUsernameSchema, email, doesAgree } from 'libraries/utils/schemas';

export const getSignUpSchema = (usernames: Set<string>) =>
  object({
    username: getUsernameSchema(usernames),
    email,
    doesAgree
  });

export type SignUpSchema = InferType<ReturnType<typeof getSignUpSchema>>;
