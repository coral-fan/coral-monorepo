import styled from '@emotion/styled';
import tokens from 'styles/tokens';
import { AvaxIcon, AvaxAltIcon } from '../icons';

interface AvaxPriceProps {
  value: string;
  isAvax: boolean;
  isAlt?: boolean;
}

const Price = styled.div`
  display: flex;
  align-items: baseline;
  gap: 6px;
  font-size: ${tokens.font.size.lg};
  line-height: ${tokens.font.line_height.lg};
  letter-spacing: ${tokens.font.letter_spacing.lg};
`;

const AltPrice = styled.div`
  display: flex;
  gap: 6px;
  color: ${tokens.font.color.secondary};
  font-size: ${tokens.font.size.xs};
  line-height: ${tokens.font.line_height.xs};
  letter-spacing: ${tokens.font.letter_spacing.xs};
`;

export const DenominatedValue = ({ value, isAlt, isAvax }: AvaxPriceProps) => {
  return (
    <>
      {!isAlt ? (
        <Price>
          {isAvax && <AvaxIcon size={14} />}
          {value}
        </Price>
      ) : (
        <AltPrice>
          {isAvax && <AvaxAltIcon />}
          {value}
        </AltPrice>
      )}
    </>
  );
};
