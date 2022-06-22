import styled from '@emotion/styled';
import { LinkButton } from 'components/ui';
import tokens from 'styles/tokens';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const AddressContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const AddressLineItem = styled.span`
  font-size: ${tokens.font.size.sm};
  line-height: ${tokens.font.line_height.sm};
  letter-spacing: ${tokens.font.letter_spacing.sm};
  color: ${tokens.font.color.secondary};
`;

const DifferentAddressLinkButton = styled(LinkButton)`
  text-transform: uppercase;
  text-decoration: underline;
  font-size: ${tokens.font.size.xs};
  line-height: ${tokens.font.line_height.xs};
  letter-spacing: ${tokens.font.letter_spacing.xs};
`;

interface ExistingShippingInfoProps {
  shippingInfoId: string;
  useDifferentAddressClick: () => void;
}
export const ExistingShippingInfo = ({
  shippingInfoId,
  useDifferentAddressClick,
}: ExistingShippingInfoProps) => {
  // TODO: Get Shipping Info from database
  const { firstName, lastName, addressLineOne, addressLineTwo, city, state, postalCode } = {
    firstName: 'Maks',
    lastName: 'Pazuniak',
    addressLineOne: '510 Willoughby Avenue',
    addressLineTwo: '#4',
    city: 'Brooklyn',
    state: 'NY',
    postalCode: '11206',
  };
  return (
    <Container>
      <AddressContainer>
        <AddressLineItem>
          {firstName} {lastName}
        </AddressLineItem>
        <AddressLineItem>{addressLineOne}</AddressLineItem>
        <AddressLineItem>{addressLineTwo}</AddressLineItem>
        <AddressLineItem>
          {city}, {state} {postalCode}
        </AddressLineItem>
      </AddressContainer>
      <DifferentAddressLinkButton onClick={useDifferentAddressClick}>
        Use Different Address
      </DifferentAddressLinkButton>
    </Container>
  );
};
