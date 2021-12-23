import { getEnvironmentVariableErrorMessage } from 'libraries/utils/errors';

if (!process.env.NEXT_PUBLIC_OPEN_LOGIN_CLIENT_ID) {
  throw new Error(getEnvironmentVariableErrorMessage('NEXT_PUBLIC_OPEN_LOGIN_CLIENT_ID'));
}

export const OPEN_LOGIN_CLIENT_ID = process.env.NEXT_PUBLIC_OPEN_LOGIN_CLIENT_ID;
