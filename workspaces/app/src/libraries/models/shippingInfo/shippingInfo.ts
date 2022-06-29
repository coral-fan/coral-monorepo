import { InferType, object, string } from 'yup';
import states from './states.json';

export const stateCodes = states.map((state) => state.value);

export const shippingInfoSchema = object({
  firstName: string().required(),
  lastName: string().required(),
  addressLineOne: string().required(),
  addressLineTwo: string().nullable().defined(),
  city: string().required(),
  state: string().oneOf(stateCodes).required(),
  zipCode: string().required(),
}).required();

export type ShippingInfo = InferType<typeof shippingInfoSchema>;
