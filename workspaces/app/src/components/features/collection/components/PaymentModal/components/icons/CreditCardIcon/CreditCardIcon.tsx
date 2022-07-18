import amexSVG from '../assets/creditCards/amex.svg';
import chinaUnionPaySVG from '../assets/creditCards/china-union-pay.svg';
import dinersSVG from '../assets/creditCards/diners.svg';
import discoverSVG from '../assets/creditCards/discover.svg';
import jcbSVG from '../assets/creditCards/jcb.svg';
import mastercardSVG from '../assets/creditCards/mastercard.svg';
import visaSVG from '../assets/creditCards/visa.svg';

import { getIconComponent } from 'components/ui/icons/utils';

const creditCardDictionary = {
  amex: amexSVG,
  chinaUnionPay: chinaUnionPaySVG,
  diners: dinersSVG,
  discover: discoverSVG,
  jcb: jcbSVG,
  mastercard: mastercardSVG,
  visa: visaSVG,
};

export type CreditCardIconType = keyof typeof creditCardDictionary;

export const isValidCreditCardType = (brand: string): brand is CreditCardIconType =>
  brand in creditCardDictionary;

export const getCreditCardIcon = (cardType: CreditCardIconType) =>
  getIconComponent(`${cardType}Card`, creditCardDictionary[cardType]);
