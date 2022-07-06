import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { shippingInfoSchema, ShippingInfo, useUpsertUser, useUserUid } from 'libraries/models';
import { getCoralAPIAxios } from 'libraries/utils';
interface ShippingInfoProps extends ShippingInfo {
  saveShippingInfo: boolean;
}

const axios = getCoralAPIAxios();

export const useUpdateShippingForm = (
  setShippingInfoId: Dispatch<SetStateAction<string | null>>
) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<ShippingInfoProps>({
    resolver: yupResolver(shippingInfoSchema),
    mode: 'onBlur',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const upsertUser = useUpsertUser();
  const uid = useUserUid();

  const handleSubmitShippingInfo = useMemo(
    () =>
      handleSubmit(async (addressData) => {
        setIsSubmitting(true);
        const {
          firstName,
          lastName,
          addressLineOne,
          addressLineTwo,
          city,
          state,
          zipCode,
          saveShippingInfo,
        } = addressData;
        try {
          const { data } = await axios.post('shipping-info', {
            firstName,
            lastName,
            addressLineOne,
            addressLineTwo,
            city,
            state,
            zipCode,
          });
          const { id: shippingInfoId } = data;
          setShippingInfoId(shippingInfoId);
          if (shippingInfoId && saveShippingInfo && uid) {
            upsertUser(uid, {
              shippingInfoId,
            });
          }
        } catch (e) {
          console.error(e);
        } finally {
          setIsSubmitting(false);
        }
      }),
    [handleSubmit, setShippingInfoId, uid, upsertUser]
  );

  return {
    register,
    setValue,
    errors,
    isValid,
    isDirty,
    isSubmitting,
    handleSubmitShippingInfo,
  };
};
