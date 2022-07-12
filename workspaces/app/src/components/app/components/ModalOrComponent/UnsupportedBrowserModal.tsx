import { Button, Message, Modal } from 'components/ui';
import { useErrorToast, useSuccessToast } from 'libraries/utils/toasts';
import { useCallback } from 'react';

export const UnsupportedBrowserModal = () => {
  const successToast = useSuccessToast();
  const errorToast = useErrorToast();

  const addCurrentUrlToClipboard = useCallback(async () => {
    try {
      await window.navigator.clipboard.writeText(window.location.href);
      successToast('Link copied to clipboard!');
    } catch (e) {
      errorToast();
    }
  }, [successToast, errorToast]);

  return (
    <Modal title="Unsupported Browser">
      <Message>
        <>
          You are on an unsupported in-app browser.
          <br />
          Please open the page in a mobile browser.
        </>
      </Message>
      <Button onClick={addCurrentUrlToClipboard}>Copy Link</Button>
    </Modal>
  );
};
