import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { QUERY } from 'styles';
import tokens from 'styles/tokens';
import { Heading, Card as BaseCard } from 'components/ui';
import { ModalHasControlButton, ModalProps } from '../types';

type ContentCardProps = Pick<
  ModalProps,
  | 'title'
  | 'variant'
  | 'contentStyle'
  | 'fullHeight'
  | 'isNarrow'
  | 'mainContainerStyle'
  | 'mainContainerHasNoGap'
  | 'children'
> &
  Partial<ModalHasControlButton>;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${QUERY.TABLET} {
    height: 100%;
    justify-content: center;
  }
`;

const Card = styled(BaseCard)<ContentCardProps>`
  max-width: ${({ isNarrow }) => (isNarrow ? '400px' : '575px')};
  max-height: ${({ fullHeight }) => (fullHeight ? '76vh' : '420px')};
  color: ${({ variant }) =>
    variant === 'contrast' ? tokens.font.color.contrast : tokens.font.color.primary};
  padding: ${({ title }) => `${title ? '20px' : '8px'} 18px`};
  box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.5);
  gap: 10px;
  overflow-y: auto;
  overflow-x: hidden;

  @media ${QUERY.TABLET} {
    gap: 18px;
    max-height: 750px;
    ${({ modalHasControlButton }) =>
      modalHasControlButton &&
      css`
        transform: translateY(calc(-1 * (${tokens.buttons.size.mobile} + 12px)));
      `}
  }

  ${({ contentStyle }) => contentStyle}
`;

const Main = styled.div<Pick<ModalProps, 'mainContainerHasNoGap' | 'mainContainerStyle'>>`
  display: flex;
  flex-direction: column;
  ${({ mainContainerHasNoGap }) =>
    mainContainerHasNoGap
      ? null
      : css`
          gap: 16px;
        `};
  ${({ mainContainerStyle }) => mainContainerStyle}
`;

export const Content = ({
  title,
  variant,
  modalHasControlButton,
  contentStyle,
  fullHeight,
  isNarrow,
  mainContainerStyle,
  mainContainerHasNoGap,
  children,
}: ContentCardProps) => (
  <Container>
    <Card
      title={title}
      variant={variant}
      modalHasControlButton={modalHasControlButton}
      contentStyle={contentStyle}
      fullHeight={fullHeight}
      isNarrow={isNarrow}
    >
      {title && (
        <Heading level={1} styleVariant={'h2'} colorVariant={variant}>
          {title}
        </Heading>
      )}
      <Main mainContainerStyle={mainContainerStyle} mainContainerHasNoGap={mainContainerHasNoGap}>
        {children}
      </Main>
    </Card>
  </Container>
);
