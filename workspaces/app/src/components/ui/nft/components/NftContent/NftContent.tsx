import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import styled from '@emotion/styled';
import { Heading, HeadingLevel, HeadingStyleVariant } from 'components/ui';
import { ReactNode } from 'react';
import tokens, { QUERY } from 'styles/tokens';

export interface NftContentProps {
  title: string;
  titleHeadingLevel: HeadingLevel;
  titleStyleVariant: HeadingStyleVariant;
  isCard: boolean;
  Badge?: () => EmotionJSX.Element;
  description?: string | false;
  children?: ReactNode;
}

interface ContentContainerProps {
  isCard: boolean;
}

const ContentContainer = styled.div<ContentContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${(props) => (props.isCard ? `10px 16px 14px 16px` : '10px 0px 0px 0px')};
  gap: ${(props) => (props.isCard ? tokens.spacing.mobile.xs : tokens.spacing.mobile.lg)};
  min-height: 104px;

  @media ${QUERY.LAPTOP} {
    gap: ${(props) => (props.isCard ? '0px' : tokens.spacing.desktop.md)};
  }
`;

const Description = styled.p`
  font-size: ${tokens.font.size.md};
  line-height: ${tokens.font.line_height.md};
  letter-spacing: ${tokens.font.letter_spacing.md};
`;

export const NftContent = ({
  title,
  titleHeadingLevel,
  titleStyleVariant,
  Badge,
  description,
  isCard,
  children,
}: NftContentProps) => (
  <ContentContainer isCard={isCard}>
    <Heading level={titleHeadingLevel} styleVariant={titleStyleVariant}>
      {title}
    </Heading>
    {Badge && <Badge />}
    {description && (
      <Description
        dangerouslySetInnerHTML={{
          __html: description,
        }}
      />
    )}
    {children}
  </ContentContainer>
);
