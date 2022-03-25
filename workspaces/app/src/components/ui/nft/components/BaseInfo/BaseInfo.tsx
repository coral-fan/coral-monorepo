import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import styled from '@emotion/styled';
import { Heading, HeadingLevel, HeadingStyleVariant } from 'components/ui';
import { FC } from 'react';
import tokens, { DESKTOP_BREAKPOINT } from 'styles/tokens';
import { ImageWithInfo, ImageWithInfoProps } from '..';

export interface BaseInfoProps extends ImageWithInfoProps {
  title: string;
  titleHeadingLevel: HeadingLevel;
  titleStyleVariant: HeadingStyleVariant;
  Badge?: () => EmotionJSX.Element;
  description?: string | false;
}

const BaseInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.mobile.xs};

  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    gap: ${tokens.spacing.desktop.xs};
  }
`;

const Description = styled.p`
  font-size: ${tokens.font.size.md};
  line-height: ${tokens.font.line_height.md};
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 16px 14px 16px;
  gap: ${tokens.spacing.mobile.lg};

  // Min-height creates space for long Collection titles
  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    gap: 0;
    min-height: 13vh;
    justify-content: space-between;
  }
`;

export const BaseInfo: FC<BaseInfoProps> = ({
  title,
  titleHeadingLevel,
  titleStyleVariant,
  Badge,
  description,
  children,
  ...imageWithInfoProps
}) => (
  <BaseInfoContainer>
    <ImageWithInfo {...imageWithInfoProps} />
    <ContentContainer>
      <Heading level={titleHeadingLevel} styleVariant={titleStyleVariant}>
        {title}
      </Heading>
      {Badge && <Badge />}
      {description && <Description>{description}</Description>}
      {children}
    </ContentContainer>
  </BaseInfoContainer>
);
