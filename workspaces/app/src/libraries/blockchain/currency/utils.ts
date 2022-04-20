const usdFormat = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const getUsdFormat = (usdPrice: number) => usdFormat.format(usdPrice);

export const getAvaxFormat = (usdPrice: number) => usdPrice.toFixed(4);

export const getPaymentLineItems = (
  usdPrice: number,
  avaxPrice: number,
  transactionFeePercentage: number,
  isAvax: boolean
) => {
  const usdTransactionFee = usdPrice * transactionFeePercentage;
  const avaxTransactionFee = avaxPrice * transactionFeePercentage;

  const usdTotal = usdPrice + usdTransactionFee;
  const avaxTotal = avaxPrice + avaxTransactionFee;

  const price = isAvax ? getAvaxFormat(avaxPrice) : getUsdFormat(usdPrice);
  const transactionFee = isAvax
    ? getAvaxFormat(avaxTransactionFee)
    : getUsdFormat(usdTransactionFee);
  const total = isAvax ? getAvaxFormat(avaxTotal) : getUsdFormat(usdTotal);
  const altTotal = isAvax ? getUsdFormat(usdTotal) : getAvaxFormat(avaxTotal);

  return { price, transactionFee, total, altTotal };
};
