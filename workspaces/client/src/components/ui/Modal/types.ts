interface ModalWithoutButtonProps {
  title?: string;
  onClick?: never;
  variant?: never;
}
interface ModalWithButtonProps {
  title?: string;
  onClick: () => void;
  variant: 'close' | 'previous';
}

export type ModalProps = ModalWithoutButtonProps | ModalWithButtonProps;
