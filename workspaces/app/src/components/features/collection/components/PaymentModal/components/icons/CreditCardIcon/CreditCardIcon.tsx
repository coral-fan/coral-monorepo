import amexSVG from '../assets/creditCards/amex.svg';
import chinaUnionPaySVG from '../assets/creditCards/chinaUnionPay.svg';
import dinersSVG from '../assets/creditCards/diners.svg';
import discoverSVG from '../assets/creditCards/discover.svg';
import jcbSVG from '../assets/creditCards/jcb.svg';
import mastercardSVG from '../assets/creditCards/mastercard.svg';
import visaSVG from '../assets/creditCards/visa.svg';

import { getIconComponent } from 'components/ui/icons/utils';

const creditCardTypes = [
  'amex',
  'chinaUnionPay',
  'diners',
  'discover',
  'jcb',
  'mastercard',
  'visa',
] as const;
export type CreditCardIconType = typeof creditCardTypes[number];

export const isValidCreditCardType = (brand: any): brand is CreditCardIconType =>
  creditCardTypes.includes(brand);

const creditCardDictionary = {
  amex: amexSVG,
  chinaUnionPay: chinaUnionPaySVG,
  diners: dinersSVG,
  discover: discoverSVG,
  jcb: jcbSVG,
  mastercard: mastercardSVG,
  visa: visaSVG,
};
export const getCreditCardIcon = (cardType: CreditCardIconType) =>
  getIconComponent(`${cardType}Card`, creditCardDictionary[cardType]);
