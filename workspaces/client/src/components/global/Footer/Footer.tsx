import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Center } from 'components/layout';
import { LogoIcon } from 'components/ui';
import tokens from 'styles/tokens';

const footerStyle = css`
  background: linear-gradient(121.65deg, #3f2d4d 8.25%, #292030 98.53%);
  position: absolute;
  left: 0%;
  bottom: 0%;
  width: 100%;
  height: 90px;
`;

const LogoWrapper = styled.div`
  position: absolute;
  top: 26px;
`;

const ContentWrapper = styled.div`
  position: absolute;
  top: 54px;
  color: ${tokens.color.white};
  font-weight: 700;
  font-size: 10px;
  line-height: 122%;
  text-align: center;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const footerContent = 'cryptomusic minting since 2021';

export const Footer = () => {
  return (
    <Center css={footerStyle}>
      <LogoWrapper>
        <LogoIcon size={20} alt={'Coral Logo'} />
      </LogoWrapper>
      <ContentWrapper>{footerContent}</ContentWrapper>
    </Center>
  );
};
