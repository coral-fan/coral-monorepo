import styled from '@emotion/styled';
import { Link } from 'components/ui';
import { CtaContent, CtaWrapperStyle } from 'components/ui/buttons/variants/CtaButton';
import { GatedEvent } from 'libraries/models';
import tokens from 'styles/tokens';

const Wrapper = styled(Link)`
  ${CtaWrapperStyle};
  display: block;
  width: 100%;
  padding: 36px 20px;
  border-top: dashed ${tokens.background.color.secondary} 3px;
`;

interface EventLinkProps {
  eventId: GatedEvent['id'];
}

export const EventLink = ({ eventId }: EventLinkProps) => (
  <Wrapper href={`/event/${eventId}`}>
    <CtaContent>Access Event</CtaContent>
  </Wrapper>
);
