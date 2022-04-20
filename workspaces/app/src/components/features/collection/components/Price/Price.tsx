import styled from '@emotion/styled';
import tokens from 'styles/tokens';
import { getAvaxFormat, getUsdFormat } from 'libraries/currency/utils';
import { useAvaxUsdPrice } from 'libraries/currency/hooks';
import { ConditionalSpinner } from 'components/ui/Spinner';

const { spacing, font } = tokens;

const PriceContainer = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${spacing.mobile.md};
`;

const UsdPrice = styled.div`
  color: ${font.color.primary};
  font-size: ${font.size.xl};
`;

const AvaxPrice = styled.div`
  color: ${font.color.secondary};
  font-size: ${font.size.xs};
  letter-spacing: ${font.letter_spacing.xs};
  line-height: ${font.line_height.xs};

  &::after {
    content: ' AVAX';
  }
`;

export interface PriceProp {
  usdPrice: number;
}

export const Price = ({ usdPrice }: PriceProp) => {
  const formattedusdPrice = getUsdFormat(usdPrice);
  const { exchangeRate, loading } = useAvaxUsdPrice();

  const avaxPrice = loading ? 0 : getAvaxFormat(usdPrice / exchangeRate);

  return (
    <PriceContainer>
      <UsdPrice>{formattedusdPrice}</UsdPrice>
      <ConditionalSpinner loading={loading} color={tokens.background.color.tertiary}>
        <AvaxPrice>{avaxPrice}</AvaxPrice>
      </ConditionalSpinner>
    </PriceContainer>
  );
};
