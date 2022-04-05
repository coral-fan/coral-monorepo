const usdFormat = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const getUsdFormat = (priceUsd: number) => usdFormat.format(priceUsd);
