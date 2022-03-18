import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { getUpdateProfileInfoSchema, UpdateUserSchema } from './schemas';
import { upsertUser, useUsernames, useUserUid } from 'libraries/models';
import { useRefetchPageData } from 'libraries/utils/hooks';
import { useIsUpdateProfileInfoModalOpen, useUser } from 'components/features/user/hooks';

export const useUpdateProfileInfoForm = () => {
  const [{ username, email, bio, socialHandles }, setUser] = useUser();
  const usernames = useUsernames();
  const updateUserSchema = getUpdateProfileInfoSchema(usernames, username);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<UpdateUserSchema>({
    resolver: yupResolver(updateUserSchema),
    mode: 'all',
    defaultValues: {
      username,
      email,
      bio,
      socialHandles,
    },
  });

  const [isUpdateProfileInfoSubmitting, setIsUpdateProfileInfoSubmitting] = useState(false);
  const uid = useUserUid();

  const refetchPageData = useRefetchPageData();

  const [, setIsModalOpen] = useIsUpdateProfileInfoModalOpen();

  const handleSubmitUpdateProfileInfo = useMemo(
    () =>
      handleSubmit(async ({ username, email, bio, socialHandles }) => {
        setIsUpdateProfileInfoSubmitting(true);
        if (
          uid !== undefined &&
          username !== undefined &&
          email !== undefined &&
          bio !== undefined &&
          socialHandles !== undefined
        ) {
          await upsertUser(uid, { username, email, bio, socialHandles });
          setUser((user) => ({
            ...user,
            username,
            email,
            bio,
            socialHandles,
          }));
          await refetchPageData();
          setIsModalOpen(false);
        }
        setIsUpdateProfileInfoSubmitting(false);
      }),
    [handleSubmit, setIsModalOpen, uid, setUser, refetchPageData]
  );
  return {
    register,
    errors,
    isValid,
    isDirty,
    isUpdateProfileInfoSubmitting,
    handleSubmitUpdateProfileInfo,
  };
};
