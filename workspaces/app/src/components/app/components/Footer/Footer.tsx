import { css } from '@emotion/react';
import styled from '@emotion/styled';
import tokens, { QUERY } from 'styles/tokens';
import { Link, SecondaryLogoIcon } from 'components/ui';
import { SITE_MAP } from 'consts';

const FOOTER_CONTENT = '© 2022 coral inc. all rights reserved.';

const { font, layout, background } = tokens;

const textStyle = css`
  font-weight: ${font.weight.normal};
  font-size: ${font.size.xs};
  line-height: ${font.line_height.xs};
  letter-spacing: ${font.letter_spacing.xs};
  text-transform: uppercase;
`;

const FooterContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 30px;
  background: ${background.color.secondary};
  width: 100%;
  padding: 18px ${layout.padding.mobile.horizontal};

  @media ${QUERY.LAPTOP} {
    padding: 30px ${layout.padding.desktop.horizontal};
  }
`;

const CopyrightWrapper = styled.div`
  grid-column: 1 / 3;
  grid-row: 3 / 4;
  color: ${font.color.secondary};
  ${textStyle};
`;

const ContentContainer = styled.div`
  grid-column: 1;
  grid-row: 1 / 2;
  display: flex;
  flex-direction: column;
  gap: 60px;

  @media ${QUERY.LAPTOP} {
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
  color: ${font.color.primary};
  ${textStyle};
`;

const SITE_MAP_LINKS = Object.values(SITE_MAP);

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
