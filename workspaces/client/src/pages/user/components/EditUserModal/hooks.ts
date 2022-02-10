import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { getEditUserSchema, EditUserSchema } from './schemas';
import { upsertUser, User, useUsernames, useUserUid } from 'libraries/models';
import { NullableString } from 'libraries/models/types';

export const useEditUserForm = (
  username: string,
  email: NullableString,
  setIsModalOpen: Dispatch<SetStateAction<boolean>>,
  setUser: Dispatch<SetStateAction<User>>
) => {
  const usernames = useUsernames();
  const editUserSchema = getEditUserSchema(usernames, username);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<EditUserSchema>({
    resolver: yupResolver(editUserSchema),
    mode: 'all',
    defaultValues: {
      username,
      email,
    },
  });

  const [isEditUserSubmitting, setIsEditUserSubmitting] = useState(false);
  const uid = useUserUid();

  const handleSubmitEditUser = useMemo(
    () =>
      handleSubmit(async ({ username, email }) => {
        setIsEditUserSubmitting(true);
        if (uid !== undefined && email !== undefined) {
          await upsertUser(uid, { username, email });
          setUser((user) => ({
            ...user,
            username,
            email,
          }));
          setIsModalOpen(false);
        }
        setIsEditUserSubmitting(false);
      }),
    [handleSubmit, setIsModalOpen, uid, setUser]
  );
  return { register, setValue, errors, isValid, isEditUserSubmitting, handleSubmitEditUser };
};
