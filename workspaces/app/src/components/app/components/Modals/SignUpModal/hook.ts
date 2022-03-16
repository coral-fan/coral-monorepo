import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { upsertUser, useUsernames, useUserUid } from 'libraries/models';
import { getSignUpSchema, SignUpSchema } from './schema';
import { useIsSigningUp } from 'libraries/authentication';
import { getCoralAPIAxios } from 'libraries/utils/api';

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

  const [, setIsSigningUp] = useIsSigningUp();

  const handleSubmitSignUp = useMemo(
    () =>
      handleSubmit(async ({ username, email, doesAgreeToMarketing }) => {
        setIsSignUpSubmitting(true);
        if (uid !== undefined) {
          try {
            await upsertUser(uid, { username, email, doesAgreeToMarketing });
            await axios.post('is-signing-up', { isSigningUp: false });
            setIsSigningUp(false);
          } catch (_) {
            setIsSignUpSubmitting(false);
          }
        }
        setIsSignUpSubmitting(false);
      }),
    [handleSubmit, uid, setIsSigningUp]
  );

  const { email } = getValues();

  const shouldShowDoesAgreeToMarketing = useMemo(() => email && email !== '', [email]);

  return {
    register,
    errors,
    isValid,
    isSignUpSubmitting,
    handleSubmitSignUp,
    shouldShowDoesAgreeToMarketing,
  };
};
