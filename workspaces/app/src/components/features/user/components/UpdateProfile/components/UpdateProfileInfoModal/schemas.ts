import { object, InferType } from 'yup';
import {
  getUsernameSchema,
  EMAIL_SCHEMA,
  BIO_SCHEMA,
  SOCIAL_HANDLE_SCHEMA,
} from 'libraries/utils/schemas';

export const getUpdateProfileInfoSchema = (usernames: Set<string>, currentUsername: string) =>
  object({
    username: getUsernameSchema(usernames, currentUsername),
    email: EMAIL_SCHEMA,
    bio: BIO_SCHEMA,
    socialHandles: object({
      twitter: SOCIAL_HANDLE_SCHEMA,
      instagram: SOCIAL_HANDLE_SCHEMA,
      soundcloud: SOCIAL_HANDLE_SCHEMA,
    }),
  });

export type UpdateUserSchema = InferType<ReturnType<typeof getUpdateProfileInfoSchema>>;
