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

  const formattedPrice = isAvax ? getAvaxFormat(avaxPrice) : getUsdFormat(usdPrice);
  const formattedTransactionFee = isAvax
    ? getAvaxFormat(avaxTransactionFee)
    : getUsdFormat(usdTransactionFee);
  const formattedTotal = isAvax ? getAvaxFormat(avaxTotal) : getUsdFormat(usdTotal);
  const formattedAltTotal = isAvax ? getUsdFormat(usdTotal) : getAvaxFormat(avaxTotal);

  const total = isAvax ? avaxTotal : usdTotal;

  return {
    total,
    formattedPrice,
    formattedTransactionFee,
    formattedTotal,
    formattedAltTotal,
  };
};
