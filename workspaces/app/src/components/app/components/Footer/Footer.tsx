import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { SecondaryLogoIcon } from 'components/ui';
import tokens, { DESKTOP_BREAKPOINT } from 'styles/tokens';
import { BaseLink } from 'components/ui';

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
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 291px;
  padding: 16px 13px;

  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    height: 330px;
    padding: 22px 21px;
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
  gap: 70px;

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

export const Footer = () => {
  return (
    <FooterContainer>
      <ContentContainer>
        <SecondaryLogoIcon />
        <LinksContainer>
          <BaseLink href={'https://google.com'}>home</BaseLink>
          <BaseLink href={'https://google.com'}>terms of service</BaseLink>
          <BaseLink href={'https://google.com'}>drops</BaseLink>
          <BaseLink href={'https://google.com'}>privacy</BaseLink>
          <BaseLink href={'https://google.com'}>about us</BaseLink>
          <BaseLink href={'https://google.com'}>instagram</BaseLink>
          <BaseLink href={'https://google.com'}>faq</BaseLink>
          <BaseLink href={'https://google.com'}>twitter</BaseLink>
        </LinksContainer>
      </ContentContainer>
      <CopyrightWrapper>{FOOTER_CONTENT}</CopyrightWrapper>
    </FooterContainer>
  );
};
