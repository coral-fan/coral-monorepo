const usdFormat = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const getUsdFormat = (priceUsd: number) => usdFormat.format(priceUsd);

export const getAvaxFormat = (priceUsd: number) => priceUsd.toFixed(4);

export const getPaymentLineItems = (
  priceUsd: number,
  priceAvax: number,
  transactionFeePercentage: number,
  isAvax: boolean
) => {
  const transactionFeeUsd = priceUsd * transactionFeePercentage;
  const transactionFeeAvax = priceAvax * transactionFeePercentage;

  const totalUsd = priceUsd + transactionFeeUsd;
  const totalAvax = priceAvax + transactionFeeAvax;

  const price = isAvax ? getAvaxFormat(priceAvax) : getUsdFormat(priceUsd);
  const transactionFee = isAvax
    ? getAvaxFormat(transactionFeeAvax)
    : getUsdFormat(transactionFeeUsd);
  const total = isAvax ? getAvaxFormat(totalAvax) : getUsdFormat(totalUsd);
  const altTotal = isAvax ? getUsdFormat(totalUsd) : getAvaxFormat(totalAvax);

  return { price, transactionFee, total, altTotal };
};
