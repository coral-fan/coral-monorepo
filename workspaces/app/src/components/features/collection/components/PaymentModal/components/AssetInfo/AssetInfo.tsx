import styled from '@emotion/styled';
import { CreatorInfo, Heading, Image } from 'components/ui';
import { Collection } from 'libraries/models';
import tokens from 'styles/tokens';

export interface AssetInfoProps {
  imageUrl: string;
  collectionName: Collection['name'];
  creatorName: Collection['creatorName'];
  creatorProfilePhoto: Collection['creatorProfilePhoto'];
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
  creatorName,
  creatorProfilePhoto: artistProfilePhoto,
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
          <CreatorInfo profilePhoto={artistProfilePhoto}>{creatorName}</CreatorInfo>
        </RightContainer>
      </TopContainer>
      <BottomContainer></BottomContainer>
    </Container>
  );
};
