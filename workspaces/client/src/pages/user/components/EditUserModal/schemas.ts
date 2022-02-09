import { object, InferType } from 'yup';
import { getUsernameSchema, EMAIL_SCHEMA } from 'libraries/utils/schemas';

export const getEditUserSchema = (usernames: Set<string>, currentUsername: string) =>
  object({
    username: getUsernameSchema(usernames, currentUsername),
    email: EMAIL_SCHEMA,
  });

export type EditUserSchema = InferType<ReturnType<typeof getEditUserSchema>>;
