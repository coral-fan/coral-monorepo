import styled from '@emotion/styled';
import { QUERY } from 'styles';

export const Header = styled.h1`
  --font-size: 34px;

  @media ${QUERY.TABLET} {
    --font-size: 52px;
  }

  @media ${QUERY.LAPTOP} {
    --font-size: 85px;
  }

  font-size: var(--font-size);
`;

export const SubHeader = styled.h2`
  --font-size: 24px;

  @media ${QUERY.TABLET} {
    --font-size: 34px;
  }

  font-size: var(--font-size);
`;

export const Paragraph = styled.p`
  --font-size: 18px;

  @media ${QUERY.TABLET} {
    --font-size: 24px;
  }

  font-size: var(--font-size);
`;

export const Layout = styled.div`
  --gap: 30px;

  @media ${QUERY.TABLET} {
    --gap: 50px;
  }
  display: flex;
  flex-direction: column;
  padding: 5%;
  gap: var(--gap);
`;

export const Section = styled.section`
  --gap: 20px;

  @media ${QUERY.TABLET} {
    --gap: 30px;
  }
  display: flex;
  flex-direction: column;
  gap: var(--gap);
`;
