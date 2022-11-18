import styled from '@emotion/styled';
import { Button, buttonStyle } from 'components/ui/buttons';
import { buttonBaseStyle } from 'components/ui/buttons/styles';
import { Input } from 'components/ui/inputs';
import { useMemo } from 'react';
import { TwitterShareButton } from 'react-share';
import tokens from 'styles/tokens';
import { ContentContainer, Heading, PrimaryContainer } from '../components';

interface ShareOnTwitterProps {
  socialShareCode: string;
  defaultContent: string;
  closeEarnModal: () => void;
}

const ShareButton = styled.div`
  ${buttonBaseStyle}
  ${buttonStyle}
  display: flex;
  align-items: center;
  justify-content: center;
  width: 175px;
`;

const BrandColor = styled.span`
  color: ${tokens.font.color.brand};
`;

const ShareButtonWrapper = styled.div`
  height: fit-content;
  width: fit-content;
`;

const ModalText = styled.div`
  font-size: ${tokens.font.size.md};
  letter-spacing: ${tokens.font.letter_spacing.md};
  line-height: ${tokens.font.line_height.md};
`;

const VerifyInputContainer = styled.div`
  display: flex;
  align-items: end;
  gap: 10px;
`;

const VerifyButton = styled(Button)`
  width: 125px;
  height: 44px;
`;

export const ShareOnTwitter = ({ socialShareCode, defaultContent }: ShareOnTwitterProps) => {
  const postContent = useMemo(() => defaultContent.replaceAll('/n', '\n'), [defaultContent]);

  return (
    <PrimaryContainer>
      <ContentContainer>
        <Heading>
          1. Share this page on Twitter and <BrandColor>earn 5 Coral points</BrandColor>
        </Heading>
        <ModalText>Post a public tweet containing your unique identifier:</ModalText>
        <ModalText>{socialShareCode}</ModalText>
        <ShareButtonWrapper>
          <TwitterShareButton key={'twitter'} title={postContent} url={socialShareCode}>
            <ShareButton>Post On Twitter</ShareButton>
          </TwitterShareButton>
        </ShareButtonWrapper>
      </ContentContainer>
      <ContentContainer>
        <Heading>2. Verify your Tweet</Heading>
        <VerifyInputContainer>
          <Input label="paste the url of the tweet you just posted"></Input>
          <VerifyButton>Verify</VerifyButton>
        </VerifyInputContainer>
      </ContentContainer>
    </PrimaryContainer>
  );
};
