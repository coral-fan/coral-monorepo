import styled from '@emotion/styled';
import { Card } from 'components/ui';
import { useIsMobile } from 'libraries/window';
import tokens, { QUERY } from 'styles/tokens';
import { ImageWithInfo, ImageWithInfoProps } from '../ImageWithInfo';
import { NftContent, NftContentProps } from '../NftContent';

const ShareCardContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  background: ${tokens.background.color.tertiary};

  @media ${QUERY.LAPTOP} {
    display: grid;
    gap: 10px;
    grid-template-columns: 1fr 1fr;
    height: 230px;
  }
`;

type ShareCardProps = ImageWithInfoProps & NftContentProps;

const NftContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px ${tokens.layout.padding.mobile.vertical};
  align-self: center;

  @media ${QUERY.LAPTOP} {
    padding: 0;
  }
`;

export const ShareCard = ({
  imageUrl,
  creatorName,
  creatorProfilePhoto,
  title,
  Badge,
}: ShareCardProps) => {
  const isMobile = useIsMobile();
  return (
    <ShareCardContainer>
      <ImageWithInfo
        imageUrl={imageUrl}
        creatorName={creatorName}
        creatorProfilePhoto={creatorProfilePhoto}
        isCard={true}
      />
      <NftContentWrapper>
        <NftContent
          title={title}
          titleHeadingLevel={2}
          titleStyleVariant={isMobile ? 'h3' : 'h2'}
          isCard={false}
          Badge={Badge}
        />
      </NftContentWrapper>
    </ShareCardContainer>
  );
};
