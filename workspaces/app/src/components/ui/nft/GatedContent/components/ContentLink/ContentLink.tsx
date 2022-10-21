import styled from '@emotion/styled';
import { Link } from 'components/ui';
import { GatedContent } from 'libraries/models';
import tokens from 'styles/tokens';

const Wrapper = styled(Link)`
  text-decoration: underline;
  color: ${tokens.font.color.brand};
  text-align: center;
`;

export const ContentLink = ({ value }: Omit<GatedContent, 'type'>) => {
  if (value) {
    return <Wrapper href={value}>Exclusive Content</Wrapper>;
  } else {
    return null;
  }
};
