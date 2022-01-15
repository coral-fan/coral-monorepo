import { Collection } from './collection';
import { Notification } from './notification';

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
  id: string;
  nonce: number;
  isSigningUp: boolean;
  username: string;
  displayName: string;
  email?: string;
  phoneNumber?: string;
  profilePhoto?: string;
  creditCardInformation?: CreditCardInformation;
  notifications?: Notification[];
  collections?: Collection[];
}
