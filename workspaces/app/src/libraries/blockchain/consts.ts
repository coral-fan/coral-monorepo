import { getEnvironmentVariableErrorMessage } from 'libraries/utils';

if (!process.env.COVALENT_API_KEY) {
  throw Error(getEnvironmentVariableErrorMessage('NEXT_COVALENT_API_KEY'));
}

export const COVALENT_API_KEY = process.env.COVALENT_API_KEY;
