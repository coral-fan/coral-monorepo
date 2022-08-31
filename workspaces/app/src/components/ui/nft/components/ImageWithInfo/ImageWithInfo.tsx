import { useCallback, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { CreatorInfo } from './components';
import { Artist, Photo, ReferralCampaignData } from 'libraries/models';
import { ConditionalWrap, Image, Link } from 'components/ui';
import tokens from 'styles/tokens';

// parent container
const ImageWithInfoContainer = styled.div`
  position: relative;
`;

//  image info components
interface ImageInfoContainerProps {
  imageInfoHeight: number;
  isCard?: boolean;
}

const ShareToEarnStickerContainer = styled.div<Omit<ImageInfoContainerProps, 'isCard'>>`
  position: absolute;
  right: 14px;
  top: 17px;
  /* height: 0;
  width: 0; */
`;

const ShareToEarnPill = styled.span`
  width: max-content;
  background: ${tokens.background.color.contrast};
  color: ${tokens.font.color.contrast};
  font-size: ${tokens.font.size.xs};
  font-weight: 500;
  text-transform: uppercase;
  border-radius: ${tokens.border.radius.md};
  text-align: center;
  padding: 7px 11px;
`;

const ArtistInfoContainer = styled.div<ImageInfoContainerProps>`
  position: absolute;
  left: 14px;
  bottom: calc(${({ imageInfoHeight }) => imageInfoHeight}px + 17px);
  height: 0;
  width: 0;
`;

const LinkWrapper = styled.div`
  width: fit-content;
  &:hover {
    opacity: 88%;
  }
`;

export interface ImageWithInfoProps {
  imageUrl: string;
  creatorName: string;
  creatorProfilePhoto: Photo;
  artistId?: Artist['id'];
  isCard?: boolean;
  referralCampaign?: ReferralCampaignData;
}

export const ImageWithInfo = ({
  imageUrl,
  creatorName,
  creatorProfilePhoto,
  artistId,
  isCard,
  referralCampaign,
}: ImageWithInfoProps) => {
  const [imageInfoHeight, setImageInfoHeight] = useState(0);

  const imageInfoRef = useCallback((element: HTMLDivElement) => {
    if (element) {
      setImageInfoHeight(element.offsetHeight);
    }
  }, []);

  const hasArtistId = useMemo(() => (artistId ? true : false), [artistId]);

  return (
    <ImageWithInfoContainer>
      <Image src={imageUrl} alt="" />
      {referralCampaign && (
        <ShareToEarnStickerContainer imageInfoHeight={imageInfoHeight}>
          <ShareToEarnPill>Share To Earn</ShareToEarnPill>
          <ShareToEarnPill>{`${referralCampaign.pointsValue} Pts`}</ShareToEarnPill>
        </ShareToEarnStickerContainer>
      )}
      <ArtistInfoContainer isCard={isCard} imageInfoHeight={imageInfoHeight}>
        <ConditionalWrap
          shouldWrap={hasArtistId}
          wrap={(children) => (
            <LinkWrapper>
              <Link href={`/artist/${artistId}`}>{children}</Link>
            </LinkWrapper>
          )}
        >
          <CreatorInfo ref={imageInfoRef} profilePhoto={creatorProfilePhoto}>
            {creatorName}
          </CreatorInfo>
        </ConditionalWrap>
      </ArtistInfoContainer>
    </ImageWithInfoContainer>
  );
};
