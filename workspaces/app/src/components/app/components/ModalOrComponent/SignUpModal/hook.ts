import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { upsertUser, useUsernames, useUserUid } from 'libraries/models';
import { getSignUpSchema, SignUpSchema } from './schema';
import { getCoralAPIAxios } from 'libraries/utils/api';
import { useRefetchPageData } from 'libraries/utils';

const axios = getCoralAPIAxios();

export const useSignUpForm = () => {
  const usernames = useUsernames();
  const signUpSchema = getSignUpSchema(usernames);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<SignUpSchema>({
    resolver: yupResolver(signUpSchema),
    mode: 'all',
  });

  const [isSignUpSubmitting, setIsSignUpSubmitting] = useState(false);
  const uid = useUserUid();

  const refetchPageData = useRefetchPageData();

  const handleSubmitSignUp = useMemo(
    () =>
      handleSubmit(async ({ username, email, doesOptIntoMarketing }) => {
        setIsSignUpSubmitting(true);
        if (uid !== undefined) {
          try {
            await upsertUser(uid, { username, email, doesOptIntoMarketing });
            await axios.post('is-signing-up', { isSigningUp: false });
            await refetchPageData();
          } catch (_) {
            setIsSignUpSubmitting(false);
          }
        }
        setIsSignUpSubmitting(false);
      }),
    [handleSubmit, uid, refetchPageData]
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
