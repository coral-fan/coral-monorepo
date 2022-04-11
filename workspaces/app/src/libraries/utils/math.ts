export const safeRound = (value: number, decimalPlace: number) => {
  if (!Number.isInteger(decimalPlace)) {
    throw Error(`Number ${decimalPlace} is not a integer.`);
  }

  const decimalFactor = 10 ** decimalPlace;
  const roundedValue = Math.round((value + Number.EPSILON) * decimalFactor) / decimalFactor;

  return roundedValue;
};
