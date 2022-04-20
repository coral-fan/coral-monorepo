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
  const transactionFeeUsd = usdPrice * transactionFeePercentage;
  const transactionFeeAvax = avaxPrice * transactionFeePercentage;

  const totalUsd = usdPrice + transactionFeeUsd;
  const totalAvax = avaxPrice + transactionFeeAvax;

  const price = isAvax ? getAvaxFormat(avaxPrice) : getUsdFormat(usdPrice);
  const transactionFee = isAvax
    ? getAvaxFormat(transactionFeeAvax)
    : getUsdFormat(transactionFeeUsd);
  const total = isAvax ? getAvaxFormat(totalAvax) : getUsdFormat(totalUsd);
  const altTotal = isAvax ? getUsdFormat(totalUsd) : getAvaxFormat(totalAvax);

  return { price, transactionFee, total, altTotal };
};
