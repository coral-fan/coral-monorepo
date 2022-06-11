import styled from '@emotion/styled';
import { Modal } from 'components/ui';
import { SocialIcon } from 'components/ui';
import { ReactNode } from 'react';
import { TwitterShareButton, FacebookShareButton } from 'react-share';
import tokens from 'styles/tokens';

interface ShareModalProps {
  title: string;
  closeShareModal: () => void;
  url: string;
  postTitle: string;
  children: ReactNode;
}

const ContentContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.mobile.md};
  margin: auto;
`;

const SocialIconsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 0px 6px;
`;

const SocialIconWrapper = styled.div`
  display: flex;
  width: 45px;
  height: 45px;
`;

export const ShareModal = ({
  closeShareModal,
  title,
  url,
  postTitle,
  children,
}: ShareModalProps) => (
  <Modal title={title} onClick={closeShareModal} fullHeight>
    <ContentContainer>{children}</ContentContainer>
    <SocialIconsContainer>
      <TwitterShareButton key={'twitter'} title={postTitle} url={url} via={'coral__fan'}>
        <SocialIconWrapper>
          <SocialIcon socialType={'twitter'} />
        </SocialIconWrapper>
      </TwitterShareButton>
      <FacebookShareButton quote={postTitle} url={url} key={'facebook'}>
        <SocialIconWrapper>
          <SocialIcon socialType={'facebook'} />
        </SocialIconWrapper>
      </FacebookShareButton>
    </SocialIconsContainer>
  </Modal>
);
