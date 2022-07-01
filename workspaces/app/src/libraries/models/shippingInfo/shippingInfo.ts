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
  firstName: string().required('First name is a required field.'),
  lastName: string().required('Last name is a required field'),
  addressLineOne: string().required('Last name is a required field.'),
  addressLineTwo: string().nullable().defined(),
  city: string().required(),
  state: string().oneOf(STATES).required(),
  zipCode: string()
    .matches(/\d/, 'Only digits are allowed.')
    .length(5, 'Zip code must be exactly 5 digits')
    .required('Zip code is a required field'),
}).required();

export type ShippingInfo = InferType<typeof shippingInfoSchema>;
