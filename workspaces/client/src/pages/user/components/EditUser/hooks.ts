import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { getEditUserSchema, EditUserSchema } from './schemas';
import { upsertUser, useUsernames, useUserUid } from 'libraries/models';

export const useEditUser = (showModal: Dispatch<SetStateAction<boolean>>) => {
  const usernames = useUsernames();
  const editUserSchema = getEditUserSchema(usernames);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<EditUserSchema>({
    resolver: yupResolver(editUserSchema),
    mode: 'all',
  });

  const [isEditUserSubmitting, setIsEditUserSubmitting] = useState(false);
  const uid = useUserUid();

  const handleSubmitEditUser = useMemo(
    () =>
      handleSubmit(async ({ username, email }) => {
        setIsEditUserSubmitting(true);
        if (uid !== undefined) {
          await upsertUser({ username, email }, uid);
        }
        setIsEditUserSubmitting(false);
        showModal(false);
      }),
    [handleSubmit, showModal, uid]
  );
  return { register, setValue, errors, isValid, isEditUserSubmitting, handleSubmitEditUser };
};
