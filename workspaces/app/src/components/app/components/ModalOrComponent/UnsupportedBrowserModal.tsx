import { Button, Message, Modal } from 'components/ui';
import { useClipboard } from 'libraries/utils/clipboard';

const getCurrentUrl = () => window.location.href;

export const UnsupportedBrowserModal = () => {
  const copyCurrentUrlToClipboard = useClipboard(getCurrentUrl, 'Link copied to clipboard!');

  return (
    <Modal title="Unsupported Browser">
      <Message>
        <>
          You are on an unsupported in-app browser.
          <br />
          Please open the page in a mobile browser.
        </>
      </Message>
      <Button onClick={copyCurrentUrlToClipboard}>Copy Link</Button>
    </Modal>
  );
};
