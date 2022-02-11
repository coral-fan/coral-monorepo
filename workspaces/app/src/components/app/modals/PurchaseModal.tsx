import { Modal, Button } from 'components/ui';

export const PurchaseModal = () => {
  const isPurchasing = false;

  if (!isPurchasing) {
    return null;
  }

  return (
    <Modal>
      <Button>Complete Purchase</Button>
    </Modal>
  );
};
