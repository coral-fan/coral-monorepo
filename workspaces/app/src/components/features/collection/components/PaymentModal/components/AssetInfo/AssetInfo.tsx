import styled from '@emotion/styled';
import { ArtistInfo, Heading, Image } from 'components/ui';
import { Collection } from 'libraries/models';
import tokens from 'styles/tokens';

export interface AssetInfoProps {
  imageUrl: string;
  collectionName: Collection['name'];
  artistName: Collection['artistName'];
  artistProfilePhoto: Collection['artistProfilePhoto'];
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TopContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.mobile.xs};
`;

const ImageWrapper = styled.div`
  width: 140px;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BottomContainer = styled.div`
  width: 100%;
  display: flex;
`;

export const AssetInfo = ({
  imageUrl,
  collectionName,
  artistName,
  artistProfilePhoto,
}: AssetInfoProps) => {
  return (
    <Container>
      <TopContainer>
        <LeftContainer>
          <ImageWrapper>
            <Image src={imageUrl} alt="" />
          </ImageWrapper>
        </LeftContainer>
        <RightContainer>
          <Heading level={2} styleVariant={'h3'}>
            {collectionName}
          </Heading>
          <ArtistInfo profilePhoto={artistProfilePhoto}>{artistName}</ArtistInfo>
        </RightContainer>
      </TopContainer>
      <BottomContainer></BottomContainer>
    </Container>
  );
};
