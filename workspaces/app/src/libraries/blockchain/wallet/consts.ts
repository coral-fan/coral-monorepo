import { getEnvironmentVariableErrorMessage } from 'libraries/utils';

if (!process.env.NEXT_PUBLIC_COVALENT_API_KEY) {
  throw Error(getEnvironmentVariableErrorMessage('NEXT_PUBLIC_COVALENT_API_KEY'));
}

export const COVALENT_API_KEY = process.env.NEXT_PUBLIC_COVALENT_API_KEY;
