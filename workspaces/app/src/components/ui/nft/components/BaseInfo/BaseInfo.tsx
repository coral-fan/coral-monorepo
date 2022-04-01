import styled from '@emotion/styled';
import { FC } from 'react';
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

export const BaseInfo: FC<BaseInfoProps> = ({
  imageUrl,
  artistName,
  artistProfilePhoto,
  title,
  titleHeadingLevel,
  titleStyleVariant,
  isCard,
  children,
}) => (
  <BaseInfoContainer>
    <ImageWithInfo
      imageUrl={imageUrl}
      artistName={artistName}
      artistProfilePhoto={artistProfilePhoto}
      isCard={isCard}
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
