import { ShippingInfo } from 'libraries/models';
import { getShippingAddressData$ } from 'libraries/models/shippingInfo/observables';
import { useEffect, useState } from 'react';
import {
  AddressContainer,
  AddressLineItem,
  AddShippingInfoLinkButton,
  Container,
  DifferentAddressLinkButton,
  NoShippingInfo,
} from './components/components';

interface ConfirmShippingInfoProps {
  shippingInfoId: string | null;
  addOrUpdateAddress: () => void;
}
export const ConfirmShippingInfo = ({
  shippingInfoId,
  addOrUpdateAddress,
}: ConfirmShippingInfoProps) => {
  const [addressData, setAddressData] = useState<ShippingInfo>();

  useEffect(() => {
    if (!shippingInfoId) {
      return;
    }

    const subscription = getShippingAddressData$(shippingInfoId).subscribe((addressData) => {
      setAddressData(addressData);
    });

    return () => subscription.unsubscribe();
  }, [shippingInfoId]);

  const { firstName, lastName, addressLineOne, addressLineTwo, city, state, zipCode } =
    addressData || {};

  return shippingInfoId ? (
    <Container>
      <AddressContainer>
        <AddressLineItem>
          {firstName} {lastName}
        </AddressLineItem>
        <AddressLineItem>{addressLineOne}</AddressLineItem>
        <AddressLineItem>{addressLineTwo}</AddressLineItem>
        <AddressLineItem>
          {city}, {state} {zipCode}
        </AddressLineItem>
      </AddressContainer>
      <DifferentAddressLinkButton onClick={addOrUpdateAddress}>
        Use Different Address
      </DifferentAddressLinkButton>
    </Container>
  ) : (
    <>
      <NoShippingInfo>Shipping info not found.</NoShippingInfo>
      <AddShippingInfoLinkButton onClick={addOrUpdateAddress}>
        Add Shipping Info
      </AddShippingInfoLinkButton>
    </>
  );
};
