import { object, InferType } from 'yup';
import { getUsernameSchema } from 'libraries/utils/schemas';

export const getEditUserSchema = (usernames: Set<string>) =>
  object({
    username: getUsernameSchema(usernames),
  });

export type EditUserSchema = InferType<ReturnType<typeof getEditUserSchema>>;
