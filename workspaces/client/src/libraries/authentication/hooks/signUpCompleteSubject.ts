import { getRefValue } from 'libraries/utils/hooks';
import { Subject } from 'rxjs';

const getSignUpCompletedSubject = getRefValue(
  () => new Subject<void>(),
  'useSignUpCompleteSubject',
  false,
  false
);

export const useSignUpCompletedSubject = () => {
  const signUpCompletedSubject = getSignUpCompletedSubject();
  return signUpCompletedSubject;
};
