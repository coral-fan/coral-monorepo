import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import axios from 'axios';
import { validateAddress } from 'libraries/utils';
import { z } from 'zod';
import { getDocumentData } from 'libraries/firebase';
import { UserReferralAccount } from 'libraries/models';

const ADDRESS_INPUT_SCHEMA = z.object({
  address: z.string().refine((addr) => validateAddress(addr)),
});

type AddressInputSchema = z.infer<typeof ADDRESS_INPUT_SCHEMA>;

export const getUseRedeemPointsForm =
  (uid: string | undefined, points: number, closeModal: () => void) => () => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<AddressInputSchema>({
      resolver: zodResolver(ADDRESS_INPUT_SCHEMA),
      mode: 'all',
    });

    const handleSubmitAddress = useMemo(
      () =>
        handleSubmit(async ({ address }) => {
          // Check that redemption is not already in process
          const referralUserDocument =
            uid && (await getDocumentData<UserReferralAccount>('user-referral-accounts', uid));
          if (!referralUserDocument || referralUserDocument.isRedeeming) {
            throw new Error(`User ${uid} has already requested a redemption that is in process`);
          }

          await axios.post('../api/referral-redemption', {
            uid,
            address,
            points,
          });
          closeModal();
        }),
      [handleSubmit]
    );

    return {
      register,
      errors,
      handleSubmitAddress,
    };
  };
