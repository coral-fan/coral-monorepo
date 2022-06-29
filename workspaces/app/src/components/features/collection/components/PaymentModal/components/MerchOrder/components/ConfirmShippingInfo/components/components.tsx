import styled from '@emotion/styled';
import { LinkButton } from 'components/ui';
import tokens from 'styles/tokens';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const AddressContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AddressLineItem = styled.span`
  font-size: ${tokens.font.size.sm};
  line-height: ${tokens.font.line_height.sm};
  letter-spacing: ${tokens.font.letter_spacing.sm};
  color: ${tokens.font.color.secondary};
`;

export const DifferentAddressLinkButton = styled(LinkButton)`
  text-transform: uppercase;
  text-decoration: underline;
  font-size: ${tokens.font.size.xs};
  line-height: ${tokens.font.line_height.xs};
  letter-spacing: ${tokens.font.letter_spacing.xs};
`;

export const AddShippingInfoLinkButton = styled(LinkButton)`
  text-transform: uppercase;
  text-decoration: underline;
  font-size: ${tokens.font.size.sm};
  line-height: ${tokens.font.line_height.sm};
  letter-spacing: ${tokens.font.letter_spacing.sm};
`;

export const NoShippingInfo = styled.p`
  font-style: italic;
  font-size: ${tokens.font.size.sm};
  line-height: ${tokens.font.line_height.sm};
  letter-spacing: ${tokens.font.letter_spacing.sm};
  color: ${tokens.font.color.secondary};
`;
