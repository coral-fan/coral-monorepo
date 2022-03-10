/* eslint-disable jsx-a11y/alt-text */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Heading, Image, SocialLink } from 'components/ui';
import { Artist } from 'libraries/models';
import tokens, { DESKTOP_BREAKPOINT } from 'styles/tokens';

type ArtistProfileProps = Omit<Artist, 'collection'>;

const { font, background, border, spacing } = tokens;

const ArtistProfileContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: ${background.color.secondary};
  border-radius: ${border.radius.lg};
  gap: ${spacing.xs};

  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    gap: ${spacing.sm};
  }
`;

const ImageWrapper = styled.div`
  border-top-left-radius: ${border.radius.lg};
  border-top-right-radius: ${border.radius.lg};
  overflow: hidden;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 14px ${spacing.md} 14px;
`;

const TextContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
  padding: 16px 0px ${spacing.md} 0px;
`;

const Description = styled.p`
  color: ${font.color.primary};
  font-size: ${font.size.md};
  letter-spacing: ${font.letter_spacing.md};
  line-height: ${font.line_height.md};
  font-weight: ${font.weight.normal};
`;

const Quote = styled.q`
  color: ${font.color.secondary};
  font-size: ${font.size.lg};
  letter-spacing: ${font.letter_spacing.lg};
  line-height: ${font.line_height.lg};
  font-weight: ${font.weight.bold};
`;

const SocialLinkContainer = styled.div`
  display: flex;
  gap: 25px;
`;

export const ArtistProfile = ({
  name,
  imageUrl,
  description,
  quote,
  socialMedia,
}: ArtistProfileProps) => {
  const { twitter, instagram, facebook } = socialMedia;

  return (
    <ArtistProfileContainer>
      <ImageWrapper>
        <Image src={imageUrl} />
      </ImageWrapper>
      <ContentContainer>
        <Heading level={1}>{name}</Heading>
        <TextContentContainer>
          <Description>{description}</Description>
          {quote && <Quote>{quote}</Quote>}
        </TextContentContainer>
        <SocialLinkContainer>
          {twitter && <SocialLink socialType="twitter" username={twitter} />}
          {instagram && <SocialLink socialType="instagram" username={instagram} />}
          {facebook && <SocialLink socialType="facebook" username={facebook} />}
        </SocialLinkContainer>
      </ContentContainer>
    </ArtistProfileContainer>
  );
};
