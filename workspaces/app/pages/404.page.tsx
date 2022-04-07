import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Heading, Link } from 'components/ui';
import tokens from 'styles/tokens';

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
`;

const Paragraph = styled.p`
  font-size: ${tokens.font.size.lg};
`;

const linkStyle = css`
  text-decoration: underline;
`;

export default function Custom404() {
  return (
    <Container>
      <Heading level={1} styleVariant={'h1'}>
        404
      </Heading>
      <Paragraph>
        Nothing here,&nbsp;
        <Link href="/" css={linkStyle}>
          explore other new experiences.
        </Link>
      </Paragraph>
    </Container>
  );
}
