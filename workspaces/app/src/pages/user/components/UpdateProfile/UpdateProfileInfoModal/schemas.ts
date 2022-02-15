import { object, InferType } from 'yup';
import { getUsernameSchema, EMAIL_SCHEMA } from 'libraries/utils/schemas';

export const getUpdateProfileInfoSchema = (usernames: Set<string>, currentUsername: string) =>
  object({
    username: getUsernameSchema(usernames, currentUsername),
    email: EMAIL_SCHEMA,
  });

export type UpdateUserSchema = InferType<ReturnType<typeof getUpdateProfileInfoSchema>>;
