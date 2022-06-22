import {
  ADDRESS_LINE_ONE_SCHEMA,
  ADDRESS_LINE_TWO_SCHEMA,
  CITY_SCHEMA,
  FIRST_NAME_SCHEMA,
  LAST_NAME_SCHEMA,
  POSTAL_CODE_SCHEMA,
  SAVE_SHIPPING_INFO_SCHEMA,
  STATE_SCHEMA,
} from 'libraries/utils';
import { InferType, object } from 'yup';

export const getShippingInfoSchema = () =>
  object({
    firstName: FIRST_NAME_SCHEMA,
    lastName: LAST_NAME_SCHEMA,
    addressLineOne: ADDRESS_LINE_ONE_SCHEMA,
    addressLineTwo: ADDRESS_LINE_TWO_SCHEMA,
    city: CITY_SCHEMA,
    state: STATE_SCHEMA,
    postalCode: POSTAL_CODE_SCHEMA,
    saveShippingInfo: SAVE_SHIPPING_INFO_SCHEMA,
  });

export type ShippingInfoSchema = InferType<ReturnType<typeof getShippingInfoSchema>>;
