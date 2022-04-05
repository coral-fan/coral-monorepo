import styled from '@emotion/styled';
import tokens from 'styles/tokens';
import { getUsdFormat } from 'libraries/utils/currency';

const { spacing, font } = tokens;

const PriceContainer = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${spacing.mobile.md};
`;

const PriceUsd = styled.div`
  color: ${font.color.primary};
  font-size: ${font.size.xl};
`;

const PriceAvax = styled.div`
  color: ${font.color.secondary};
  font-size: ${font.size.xs};
  letter-spacing: ${font.letter_spacing.xs};
  line-height: ${font.line_height.xs};

  &::after {
    content: ' AVAX';
  }
`;

export interface PriceProp {
  priceUsd: number;
}

export const Price = ({ priceUsd }: PriceProp) => {
  const formattedPriceUsd = getUsdFormat(priceUsd);
  const formattedPriceAvax = priceUsd.toFixed(2);

  return (
    <PriceContainer>
      <PriceUsd>{formattedPriceUsd}</PriceUsd>
      <PriceAvax>{formattedPriceAvax}</PriceAvax>
    </PriceContainer>
  );
};
