import { css } from '@emotion/react';
import styled from '@emotion/styled';
import tokens, { DESKTOP_BREAKPOINT } from 'styles/tokens';
import { Link, SecondaryLogoIcon } from 'components/ui';

const FOOTER_CONTENT = '© 2022 coral inc. all rights reserved.';

const textStyle = css`
  font-weight: ${tokens.font.weight.normal};
  font-size: ${tokens.font.size.xs};
  line-height: ${tokens.font.line_height.xs};
  letter-spacing: ${tokens.font.letter_spacing.xs};
  text-transform: uppercase;
`;

const FooterContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 30px;
  background: ${tokens.background.color.secondary};
  width: 100%;
  padding: 18px ${tokens.layoutPadding.mobile.horizontal};

  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    padding: 30px ${tokens.layoutPadding.desktop.horizontal};
  }
`;

const CopyrightWrapper = styled.div`
  grid-column: 1 / 3;
  grid-row: 3 / 4;
  color: ${tokens.font.color.secondary};
  ${textStyle};
`;

const ContentContainer = styled.div`
  grid-column: 1;
  grid-row: 1 / 2;
  display: flex;
  flex-direction: column;
  gap: 60px;

  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    border: none;
    flex-direction: row;
    gap: calc(100% - 640px);
  }
`;

const LinksContainer = styled.div`
  width: fit-content;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(4, 14px);
  row-gap: 10px;
  column-gap: 60px;
  color: ${tokens.font.color.primary};
  ${textStyle};
`;

const SITE_MAP_LINKS = [
  ['Home', 'https://google.com'],
  ['Terms of Service', 'https://google.com'],
  ['Drops', 'https://google.com'],
  ['Privacy', 'https://google.com'],
  ['About Us', 'https://google.com'],
  ['Instagram', 'https://google.com'],
  ['FAQ', 'https://google.com'],
  ['Twitter', 'https://google.com'],
];

export const Footer = () => {
  return (
    <FooterContainer>
      <ContentContainer>
        <SecondaryLogoIcon />
        <LinksContainer>
          {SITE_MAP_LINKS.map(([label, url]) => (
            <Link href={url} key={label}>
              {label}
            </Link>
          ))}
        </LinksContainer>
      </ContentContainer>
      <CopyrightWrapper>{FOOTER_CONTENT}</CopyrightWrapper>
    </FooterContainer>
  );
};
