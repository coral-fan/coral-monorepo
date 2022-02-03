import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { upsertUser, useUsername, useUserUid } from 'libraries/firebase';
import { getSignUpSchema, SignUpSchema } from './schema';

export const useSignUpForm = () => {
  const usernames = useUsername();
  const signUpSchema = getSignUpSchema(usernames);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpSchema>({
    resolver: yupResolver(signUpSchema),
    mode: 'all',
  });

  const [isSignUpSubmitting, setIsSignUpSubmitting] = useState(false);
  const uid = useUserUid();

  const handleSubmitSignUp = useMemo(
    () =>
      handleSubmit(async ({ username, email }) => {
        setIsSignUpSubmitting(true);
        if (uid !== undefined) {
          await upsertUser({ username, email }, uid);
        }
        setIsSignUpSubmitting(false);
      }),
    [handleSubmit, uid]
  );

  return { register, errors, isValid, isSignUpSubmitting, handleSubmitSignUp };
};
