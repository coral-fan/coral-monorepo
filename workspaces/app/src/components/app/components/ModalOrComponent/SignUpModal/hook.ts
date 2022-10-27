import { useMemo, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUpsertUser, useUsernames, useUserUid } from 'libraries/models';
import { getSignUpSchema, SignUpSchema } from './schema';
import { getCoralAPIAxios } from 'libraries/utils/api';
import { useRefetchPageData } from 'libraries/utils';
import { useWallet } from 'libraries/blockchain';
import { Web3AuthConnector } from 'libraries/blockchain/wallet/connectors';

const axios = getCoralAPIAxios();

export const useSignUpForm = () => {
  const usernames = useUsernames();
  const signUpSchema = getSignUpSchema(usernames);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm<SignUpSchema>({
    resolver: yupResolver(signUpSchema),
    mode: 'all',
    defaultValues: {
      doesOptIntoMarketing: true,
    },
  });

  const { connector } = useWallet();

  useEffect(() => {
    if (connector instanceof Web3AuthConnector) {
      connector
        .connectEagerly()
        .then(() => {
          return connector.getUserInfo();
        })
        .then((userInfo) => {
          if (userInfo?.email) {
            setValue('email', userInfo.email);
          }
        });
    }
  }, [connector, setValue]);

  const [isSignUpSubmitting, setIsSignUpSubmitting] = useState(false);
  const uid = useUserUid();

  const refetchPageData = useRefetchPageData();

  const upsertUser = useUpsertUser();

  const handleSubmitSignUp = useMemo(
    () =>
      handleSubmit(async ({ username, email, doesOptIntoMarketing }) => {
        setIsSignUpSubmitting(true);
        if (uid !== undefined) {
          try {
            await upsertUser(uid, {
              username,
              email,
              doesOptIntoMarketing: email !== undefined && doesOptIntoMarketing,
            });
            await axios.post('is-signing-up', { isSigningUp: false });
            await refetchPageData();
          } catch (_) {
            setIsSignUpSubmitting(false);
          }
        }
        setIsSignUpSubmitting(false);
      }),
    [handleSubmit, uid, refetchPageData, upsertUser]
  );

  return {
    register,
    errors,
    isValid,
    isSignUpSubmitting,
    handleSubmitSignUp,
    getValues,
  };
};
