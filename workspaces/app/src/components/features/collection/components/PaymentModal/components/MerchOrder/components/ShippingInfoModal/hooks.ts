import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { getShippingInfoSchema, ShippingInfoSchema } from './schemas';
import { useUserUid } from 'libraries/models';
import { useRefetchPageData } from 'libraries/utils/hooks';

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

  const handleSubmitShippingInfo = useMemo(
    () =>
      handleSubmit(async () => {
        // TODO: Handle submit Shipping Info
        console.log('Submitted Form');
      }),
    [handleSubmit]
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
