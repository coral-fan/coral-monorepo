import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { getShippingInfoSchema, ShippingInfoSchema } from './schemas';
import { useUpsertUser, useUsernames, useUserUid } from 'libraries/models';
import { useRefetchPageData } from 'libraries/utils/hooks';
import { useIsUpdateProfileInfoModalOpen, useUser } from 'components/features/user/hooks';

export const useUpdateShippingForm = () => {
  const shippingInfoSchema = getShippingInfoSchema();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<ShippingInfoSchema>({
    resolver: yupResolver(shippingInfoSchema),
    mode: 'all',
  });

  const uid = useUserUid();

  const refetchPageData = useRefetchPageData();

  const upsertUser = useUpsertUser();

  const handleSubmitShippingInfo = useMemo(
    () =>
      handleSubmit(async () => {
        console.log('Submitted Form');
      }),
    [handleSubmit]
    //     setIsUpdateProfileInfoSubmitting(true);
    //     if (
    //       uid !== undefined &&
    //       username !== undefined &&
    //       email !== undefined &&
    //       bio !== undefined
    //     ) {
    //       await upsertUser(uid, {
    //         username,
    //         email,
    //         bio,
    //         socialHandles: {
    //           ...socialHandlesFromDb,
    //           ...socialHandlesFromForm,
    //         },
    //       });
    //       setUser((user) => ({
    //         ...user,
    //         username,
    //         email,
    //         bio,
    //         socialHandles: {
    //           ...socialHandlesFromDb,
    //           ...socialHandlesFromForm,
    //         },
    //       }));
    //       await refetchPageData();
    //       setIsModalOpen(false);
    //     }
    //   }),
    // [handleSubmit, uid, socialHandlesFromDb, setUser, refetchPageData, setIsModalOpen, upsertUser]
  );

  return {
    register,
    setValue,
    errors,
    isValid,
    isDirty,
    // isUpdateProfileInfoSubmitting,
    handleSubmitShippingInfo,
  };
};
