import styled from '@emotion/styled';
import { Link } from 'components/ui';
import { CtaContent, CtaWrapperStyle } from 'components/ui/buttons/variants/CtaButton';
import { Event } from 'libraries/models';
import tokens from 'styles/tokens';

const Wrapper = styled(Link)`
  ${CtaWrapperStyle};
  display: block;
  padding: 36px 20px;
  border-top: dashed ${tokens.background.color.primary} 3px;
`;

interface AccessEventLinkProps {
  eventId: Event['id'];
}
export const AccessEventLink = ({ eventId }: AccessEventLinkProps) => (
  <Wrapper href={`events/${eventId}`}>
    <CtaContent>Access Event</CtaContent>
  </Wrapper>
);
