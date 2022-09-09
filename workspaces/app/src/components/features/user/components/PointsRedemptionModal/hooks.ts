import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useState } from 'react';
import { getCoralAPIAxios, validateAddress } from 'libraries/utils';
import { z } from 'zod';
import { getDocumentData } from 'libraries/firebase';
import { UserReferralAccount, useUserUid } from 'libraries/models';
import { useErrorToast } from 'libraries/utils/toasts';

const ADDRESS_INPUT_SCHEMA = z.object({
  address: z.string().refine((addr) => validateAddress(addr)),
});

const axios = getCoralAPIAxios();

type AddressInputSchema = z.infer<typeof ADDRESS_INPUT_SCHEMA>;

export const getUseRedeemPointsForm = () => () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<AddressInputSchema>({
    resolver: zodResolver(ADDRESS_INPUT_SCHEMA),
    mode: 'all',
  });

  const [isRedeemingPoints, setIsRedeemingPoints] = useState(false);
  const uid = useUserUid();

  const handleSubmitAddress = useMemo(
    () =>
      handleSubmit(async ({ address }) => {
        const errorToast = useErrorToast();

        setIsRedeemingPoints(true);

        try {
          // Check that redemption is not already in process
          const referralUserDocument =
            uid && (await getDocumentData<UserReferralAccount>('user-referral-accounts', uid));

          if (!referralUserDocument || referralUserDocument.isRedeeming) {
            throw new Error(`User ${uid} has already requested a redemption that is in process`);
          }

          await axios.post('referral-redemption', {
            address,
          });
        } catch (e) {
          errorToast();
          console.error(e);
        }
        setIsRedeemingPoints(false);
      }),
    [uid, handleSubmit]
  );

  return {
    register,
    errors,
    isRedeemingPoints,
    isDirty,
    isValid,
    handleSubmitAddress,
  };
};
