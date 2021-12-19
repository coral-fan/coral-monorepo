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

interface Notification {
  message: string;
  timestamp: Date;
  read: boolean;
}

export interface User {
  id: string;
  username: string;
  displayName: string;
  email: string;
  phoneNumber?: string;
  profilePhoto?: string;
  creditCardInformation?: CreditCardInformation;
  notifications: Notification[];
}
