import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { getUpdateUserSchema, UpdateUserSchema } from './schemas';
import { upsertUser, User, useUsernames, useUserUid } from 'libraries/models';
import { NullableString } from 'libraries/models/types';
import { useRefetchPageData } from 'libraries/utils/hooks';

export const useUpdateProfileForm = (
  username: string,
  email: NullableString,
  setIsModalOpen: Dispatch<SetStateAction<boolean>>,
  setUser: Dispatch<SetStateAction<User>>
) => {
  const usernames = useUsernames();
  const updateUserSchema = getUpdateUserSchema(usernames, username);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<UpdateUserSchema>({
    resolver: yupResolver(updateUserSchema),
    mode: 'all',
    defaultValues: {
      username,
      email,
    },
  });

  const [isUpdateProfileSubmitting, setIsUpdateProfileSubmitting] = useState(false);
  const uid = useUserUid();

  const refetchPageData = useRefetchPageData();

  const handleSubmitUpdateProfile = useMemo(
    () =>
      handleSubmit(async ({ username, email }) => {
        setIsUpdateProfileSubmitting(true);
        if (uid !== undefined && email !== undefined) {
          await upsertUser(uid, { username, email });
          setUser((user) => ({
            ...user,
            username,
            email,
          }));
          refetchPageData();
          setIsModalOpen(false);
        }
        setIsUpdateProfileSubmitting(false);
      }),
    [handleSubmit, setIsModalOpen, uid, setUser, refetchPageData]
  );
  return {
    register,
    setValue,
    errors,
    isValid,
    isUpdateProfileSubmitting,
    handleSubmitUpdateProfile,
  };
};
