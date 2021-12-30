import styled from '@emotion/styled';
import { Flex, Center } from 'components/layout';
import { LogoIcon } from 'components/ui';
import tokens from 'styles/tokens';

const FOOTER_CONTENT = 'coral minting since 2021';

const FooterContainer = styled(Center)`
  background: linear-gradient(121.65deg, #3f2d4d 8.25%, #292030 98.53%);
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 90px;
`;

const ContentContainer = styled(Flex)`
  gap: 8px;
`;

const Content = styled.div`
  color: ${tokens.color.white};
  font-weight: 700;
  font-size: 10px;
  line-height: 122%;
  text-align: center;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const Footer = () => {
  return (
    <FooterContainer>
      <ContentContainer direction={'column'} alignItems={'center'}>
        <LogoIcon size={20} />
        <Content>{FOOTER_CONTENT}</Content>
      </ContentContainer>
    </FooterContainer>
  );
};
