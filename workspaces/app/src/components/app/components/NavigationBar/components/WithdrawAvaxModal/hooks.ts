import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useState } from 'react';
import { getErrorMessage, validateAddress } from 'libraries/utils';
import { z } from 'zod';
import { useErrorToast } from 'libraries/utils/toasts';
import { ethers } from 'ethers';
import { useWallet } from 'libraries/blockchain';
import { TransactionReceipt } from '@ethersproject/providers';

const WITHDRAW_SCHEMA = z.object({
  to: z.string().refine((addr) => validateAddress(addr)),
});

type WithdrawSchema = z.infer<typeof WITHDRAW_SCHEMA>;

export const useWithdrawAvaxForm = () => {
  const { provider, address } = useWallet();

  if (!provider || !address) {
    throw Error('Unable to connect to provider');
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<WithdrawSchema>({
    resolver: zodResolver(WITHDRAW_SCHEMA),
    mode: 'all',
  });

  const [isWithdrawingAvax, setIsWithdrawingAvax] = useState(false);
  const [withdrawTxnReceipt, setWithdrawTxnReceipt] = useState<TransactionReceipt>();

  const errorToast = useErrorToast();

  const handleSubmitAddress = useMemo(
    () =>
      handleSubmit(async ({ to }) => {
        try {
          setIsWithdrawingAvax(true);

          const balance = await provider.getBalance(address);

          if (balance.lte(0)) {
            throw Error('Balance must be greater than zero');
          }

          // Transaction
          const transaction = {
            to,
            value: balance,
          };

          // Get estimated gas cost
          const { maxFeePerGas } = await provider.getFeeData();

          if (!maxFeePerGas) {
            throw Error('Unable to fetch gas data');
          }

          // Gas for transaction
          const estimatedGas = await provider.estimateGas(transaction);

          // Max gas cost for transaction
          const estimatedMaxGasCost = estimatedGas.mul(maxFeePerGas);

          // Total transaction cost less estimated gas
          const estimatedTxnValue = balance.sub(estimatedMaxGasCost);

          // Send transaction
          const signer = provider.getSigner();
          const txn = await signer.sendTransaction({
            to,
            value: estimatedTxnValue,
          });

          const txnReceipt = await txn.wait();

          // Set Txn Receipt
          setWithdrawTxnReceipt(txnReceipt);

          console.log(txnReceipt);
        } catch (e) {
          errorToast(`Error: ${getErrorMessage(e)}`);
          console.error(e);
        }
        setIsWithdrawingAvax(false);
      }),
    [provider, address, handleSubmit, errorToast]
  );

  return {
    register,
    errors,
    isWithdrawingAvax,
    isDirty,
    isValid,
    withdrawTxnReceipt,
    handleSubmitAddress,
  };
};
