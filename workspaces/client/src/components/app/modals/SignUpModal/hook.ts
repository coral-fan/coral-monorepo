import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { collectionData } from 'rxfire/firestore';
import { map } from 'rxjs';
import {
  getCollectionReferenceClientSide,
  getDocumentReferenceClientSide,
  useUserUid,
} from 'libraries/firebase';
import { getSignUpSchema, SignUpSchema } from './schema';
import { useObservable } from 'libraries/utils/hooks';
import { setDoc } from 'firebase/firestore';

const getUsernames$ = () => {
  const usersCollectionReference = getCollectionReferenceClientSide('users');
  return collectionData(usersCollectionReference).pipe(
    map((users) => new Set(users.map((user) => user.username.toLowerCase())))
  );
};
const useUsername = () => {
  const initialUsernames = useMemo(() => new Set<string>(), []);
  return useObservable(getUsernames$, initialUsernames);
};

const completeSignUp = async (username: string, email?: string, uid?: string) => {
  if (uid === undefined) {
    return;
  }

  try {
    const userDocumentReference = await getDocumentReferenceClientSide('users', uid);

    const userData = email ? { username, email } : { username };

    await setDoc(userDocumentReference, userData);

    const isSigningUpDocRef = await getDocumentReferenceClientSide('is-signing-up', uid);

    await setDoc(isSigningUpDocRef, { isSigningUp: false });
  } catch (error) {
    console.log(error);
  }
};

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
        await completeSignUp(username, email, uid);
        setIsSignUpSubmitting(false);
      }),
    [handleSubmit, uid]
  );

  return { register, errors, isValid, isSignUpSubmitting, handleSubmitSignUp };
};
