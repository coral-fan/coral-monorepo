import { InferType, object, string } from 'yup';

export const STATES = [
  'AL',
  'AK',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'FL',
  'GA',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'OH',
  'OK',
  'OR',
  'PA',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY',
];

export const shippingInfoSchema = object({
  firstName: string().required(),
  lastName: string().required(),
  addressLineOne: string().required(),
  addressLineTwo: string().nullable().defined(),
  city: string().required(),
  state: string().oneOf(STATES).required(),
  zipCode: string().length(5).required(),
}).required();

export type ShippingInfo = InferType<typeof shippingInfoSchema>;
