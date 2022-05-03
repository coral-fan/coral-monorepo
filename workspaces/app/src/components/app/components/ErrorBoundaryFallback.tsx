import styled from '@emotion/styled';
import { Heading, LinkButton as LinkButtonBase } from 'components/ui';
import { FallbackProps } from 'react-error-boundary';
import tokens, { QUERY } from 'styles/tokens';

const { mobile, desktop } = tokens.layout.padding;

const Container = styled.div`
  height: 100vh;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: ${tokens.layout.width.max};
  flex: 1;
  gap: 16px;

  --padding: 0 ${mobile.horizontal};

  @media ${QUERY.LAPTOP} {
    --padding: 0 ${desktop.horizontal};
    --padding-bottom: ${desktop.vertical};
  }
  padding: var(--padding);
  padding-bottom: var(--padding-bottom);
`;

const LinkButton = styled(LinkButtonBase)`
  text-decoration: underline;
  font-size: ${tokens.font.size.lg};
`;

export const ErrorBoundaryFallback = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <Container>
      <Heading level={1} styleVariant={'h1'}>
        Oops, something went wrong...
      </Heading>
      <LinkButton onClick={resetErrorBoundary}>click here to reload the page.</LinkButton>
    </Container>
  );
};
