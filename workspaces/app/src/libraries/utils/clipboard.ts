import { useErrorToast, useSuccessToast } from 'libraries/utils/toasts';
import { useCallback } from 'react';

export const useClipboard = (getValue: () => string, successMessage: string) => {
  const successToast = useSuccessToast();
  const errorToast = useErrorToast();

  const copyValueToClipboard = useCallback(async () => {
    try {
      const value = getValue();
      await window.navigator.clipboard.writeText(value);
      successToast(successMessage);
    } catch (_) {
      errorToast();
    }
  }, [getValue, successToast, successMessage, errorToast]);

  return copyValueToClipboard;
};
