import { ethers } from 'ethers';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMemo } from 'react';

const validateAddress = z
  .function()
  .args(z.string())
  .returns(z.boolean())
  .implement((x) => {
    return ethers.utils.isAddress(x);
  });

const ADDRESS_INPUT_SCHEMA = z.object({
  address: z.string().refine((addr) => validateAddress(addr)),
});

type AddressInputSchema = z.infer<typeof ADDRESS_INPUT_SCHEMA>;

export const useRedeemPointsForm = (closeModal: () => void) => {
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
        // TODO: Do Stuff
        console.log(`Submitting address: ${address}`);
        closeModal();
      }),
    [handleSubmit, closeModal]
  );

  return {
    register,
    errors,
    handleSubmitAddress,
  };
};
