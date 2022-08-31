import styled from '@emotion/styled';
import tokens, { QUERY } from 'styles/tokens';
import { ImageWithInfo, ImageWithInfoProps } from '..';
import { NftContent, NftContentProps } from '../NftContent/NftContent';

export type BaseInfoProps = ImageWithInfoProps & NftContentProps;

const BaseInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.mobile.xs};

  @media ${QUERY.LAPTOP} {
    gap: ${tokens.spacing.desktop.xs};
  }
`;

export const BaseInfo = ({
  imageUrl,
  creatorName,
  creatorProfilePhoto,
  title,
  titleHeadingLevel,
  titleStyleVariant,
  isCard,
  children,
  referralCampaign,
}: BaseInfoProps) => (
  <BaseInfoContainer>
    <ImageWithInfo
      imageUrl={imageUrl}
      creatorName={creatorName}
      creatorProfilePhoto={creatorProfilePhoto}
      isCard={isCard}
      referralCampaign={referralCampaign}
    />
    <NftContent
      title={title}
      titleHeadingLevel={titleHeadingLevel}
      titleStyleVariant={titleStyleVariant}
      isCard={isCard}
    >
      {children}
    </NftContent>
  </BaseInfoContainer>
);
