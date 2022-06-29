import { getDocumentData } from 'libraries/firebase';
import { from } from 'rxjs';
import { ShippingInfo } from './shippingInfo';

export const getShippingAddressData$ = (shippingInfoId: string) =>
  from(getDocumentData<ShippingInfo>('shipping-info', shippingInfoId));
