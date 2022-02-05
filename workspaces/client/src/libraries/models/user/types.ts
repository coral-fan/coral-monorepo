import { Asset } from '../asset';
import { Notification } from '../notification';
import { NullableString } from '../types';

interface CreditCardInformation {
  firstName: string;
  lastName: string;
  cardNumber: number;
  Expiration: string;
  CVV: number;
  billingAddress: {
    address: string;
    zipCode: number;
    city: string;
  };
}

//  id = wallet address
export interface User {
  username: string;
  profilePhoto: NullableString;
  notifications: Notification[];
  assets: Asset[];
}

export interface PrivateUserData {
  email: NullableString;
  creditCardInformation: CreditCardInformation | null;
}
