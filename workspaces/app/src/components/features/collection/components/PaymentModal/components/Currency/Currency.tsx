import styled from '@emotion/styled';
import tokens from 'styles/tokens';
import { AvaxIcon, AvaxAltIcon } from '../icons';

interface AvaxPriceProps {
  value: string;
  isAvax: boolean;
  isAlt?: boolean;
}

const Value = styled.div`
  display: flex;
  align-items: baseline;
  gap: 6px;
  font-size: ${tokens.font.size.lg};
  line-height: ${tokens.font.line_height.lg};
  letter-spacing: ${tokens.font.letter_spacing.lg};
`;

const AltValue = styled.div`
  display: flex;
  gap: 6px;
  color: ${tokens.font.color.secondary};
  font-size: ${tokens.font.size.xs};
  line-height: ${tokens.font.line_height.xs};
  letter-spacing: ${tokens.font.letter_spacing.xs};
`;

export const Currency = ({ value, isAlt, isAvax }: AvaxPriceProps) =>
  isAlt ? (
    <AltValue>
      {isAvax && <AvaxAltIcon />}
      {value}
    </AltValue>
  ) : (
    <Value>
      {isAvax && <AvaxIcon size={14} />}
      {value}
    </Value>
  );
