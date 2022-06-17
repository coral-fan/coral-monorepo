import { NullableString } from './types';

export interface ShippingInfo {
  firstName: string;
  lastName: string;
  addressLineOne: string;
  addressLineTwo: NullableString;
  city: string;
  state: string;
  zipCode: string;
}
