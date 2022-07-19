import styled from '@emotion/styled';
import { Link } from 'components/ui';
import { GatedUrl } from 'libraries/models';
import tokens from 'styles/tokens';

const Wrapper = styled(Link)`
  text-decoration: underline;
  color: ${tokens.font.color.brand};
  text-align: center;
`;

type ContentLinkProps = Pick<GatedUrl, 'url'>;

export const ContentLink = ({ url }: ContentLinkProps) => (
  <Wrapper href={url}>Download Content</Wrapper>
);
