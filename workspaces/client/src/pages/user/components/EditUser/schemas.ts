import { object, InferType } from 'yup';
import { getUsernameSchema, email } from 'libraries/utils/schemas';

export const getEditUserSchema = (usernames: Set<string>) =>
  object({
    email,
    username: getUsernameSchema(usernames),
  });

export type EditUserSchema = InferType<ReturnType<typeof getEditUserSchema>>;
