interface ModalBaseProps {
  title?: string;
}
interface ModalWithoutButtonProps extends ModalBaseProps {
  onClick?: never;
  variant?: never;
}
interface ModalWithButtonProps extends ModalBaseProps {
  onClick: () => void;
  variant: 'close' | 'previous';
}

export type ModalProps = ModalWithoutButtonProps | ModalWithButtonProps;
