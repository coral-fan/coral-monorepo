import { ButtonLink } from 'components/ui';

interface BuyTicketButtonProps {
  collectionId: string;
}

export const BuyTicketButton = ({ collectionId }: BuyTicketButtonProps) => (
  <ButtonLink href={`/collection/${collectionId}`}>Buy Ticket</ButtonLink>
);
