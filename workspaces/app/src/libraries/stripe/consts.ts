import { getEnvironmentVariableErrorMessage } from 'libraries/utils';

if (!process.env.NEXT_PUBLIC_PUBLISHABLE_KEY) {
  throw Error(getEnvironmentVariableErrorMessage('NEXT_PUBLIC_PUBLISHABLE_KEY'));
}

export const NEXT_PUBLIC_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_PUBLISHABLE_KEY;
