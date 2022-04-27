import { getClientSideOnlyErrorMessage, isServerSide } from 'libraries/utils';

const CLIENT_SIDE_ONLY_ERROR_MESSAGE = getClientSideOnlyErrorMessage('isMetaMaskInjected');

export const isMetaMaskInjected = () => {
  if (isServerSide()) {
    throw CLIENT_SIDE_ONLY_ERROR_MESSAGE;
  }
  return window.ethereum !== undefined && window.ethereum.addListener !== undefined;
};
