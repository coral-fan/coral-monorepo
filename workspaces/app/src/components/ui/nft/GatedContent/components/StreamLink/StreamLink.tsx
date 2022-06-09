import styled from '@emotion/styled';
import { Link } from 'components/ui';
import { CtaContent, CtaWrapperStyle } from 'components/ui/buttons/variants/CtaButton';
import { GatedStream } from 'libraries/models';
import tokens from 'styles/tokens';

const Wrapper = styled(Link)`
  ${CtaWrapperStyle};
  display: block;
  width: 100%;
  padding: 36px 20px;
  border-top: dashed ${tokens.background.color.secondary} 3px;
`;

interface StreamLinkProps {
  eventId: GatedStream['id'];
}

export const StreamLink = ({ eventId }: StreamLinkProps) => (
  <Wrapper href={`/stream/${eventId}`}>
    <CtaContent>Access Stream</CtaContent>
  </Wrapper>
);
