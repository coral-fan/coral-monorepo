import { object, InferType } from 'yup';
import { getUsernameSchema, EMAIL_SCHEMA } from 'libraries/utils/schemas';

export const getEditUserSchema = (usernames: Set<string>) =>
  object({
    username: getUsernameSchema(usernames),
    email: EMAIL_SCHEMA,
  });

export type EditUserSchema = InferType<ReturnType<typeof getEditUserSchema>>;
