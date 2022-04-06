import styled from '@emotion/styled';
import { Card } from 'components/ui';
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
  padding: 10px ${tokens.layout.padding.mobile.vertical};

  @media ${QUERY.LAPTOP} {
    padding: 0;
  }
`;

export const ShareCard = ({
  imageUrl,
  artistName,
  artistProfilePhoto,
  title,
  Badge,
}: ShareCardProps) => (
  <ShareCardContainer>
    <ImageWithInfo
      imageUrl={imageUrl}
      artistName={artistName}
      artistProfilePhoto={artistProfilePhoto}
      isCard={true}
    />
    <NftContentWrapper>
      <NftContent
        title={title}
        titleHeadingLevel={2}
        titleStyleVariant={'h2'}
        Badge={Badge}
        isCard={false}
      />
    </NftContentWrapper>
  </ShareCardContainer>
);
