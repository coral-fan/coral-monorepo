import styled from '@emotion/styled';
import { Heading, HeadingLevel } from 'components/ui/Heading';
import { FC } from 'react';
import tokens from 'styles/tokens';
import { ImageWithInfo, ImageWithInfoProps } from '..';

export interface BaseInfoProps extends ImageWithInfoProps {
  title: string;
  titleHeadingLevel: HeadingLevel;
  description?: string;
}

const BaseInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Description = styled.p`
  font-size: ${tokens.font.size.md};
  line-height: ${tokens.font.line_height.md};
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 10px 16px;
`;

export const BaseInfo: FC<BaseInfoProps> = ({
  title,
  titleHeadingLevel,
  description,
  children,
  ...imageWithInfoProps
}) => (
  <BaseInfoContainer>
    <ImageWithInfo {...imageWithInfoProps} />
    <ContentContainer>
      <Heading level={titleHeadingLevel}>{title}</Heading>
      {description && <Description>{description}</Description>}
      {children}
    </ContentContainer>
  </BaseInfoContainer>
);
