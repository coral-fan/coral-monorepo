import styled from '@emotion/styled';
import { Card, Image, ScrollableContainer } from 'components/ui';
import { QUERY } from 'styles';
import tokens from 'styles/tokens';
import { PillLink } from './pills';

const Container = styled(Card)`
  min-width: 285px;
  max-width: 335px;

  flex: 0 0 80%;

  @media ${QUERY.TABLET} {
    flex: 0 0 60%;
  }

  @media ${QUERY.LAPTOP} {
    flex: 0 0 40%;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 14px;
  height: 140px;
`;

const Name = styled.h4`
  --font-size: ${tokens.font.size.md};
  font-size: var(--font-size);

  font-weight: ${tokens.font.weight.bold};

  @media ${QUERY.TABLET} {
    --font-size: ${tokens.font.size.lg};
  }
`;

const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 14px;
`;

const MemberPrice = styled.span`
  --font-size: ${tokens.font.size.md};
  font-size: var(--font-size);

  --line-height: ${tokens.font.line_height.md};
  line-height: var(--line-height);

  @media ${QUERY.TABLET} {
    --font-size: ${tokens.font.size.lg};
    --line-height: ${tokens.font.line_height.lg};
  }

  &:before {
    content: '$';
  }
`;

const Label = styled.span`
  font-size: ${tokens.font.size.sm};
  color: ${tokens.font.color.secondary};
  line-height: ${tokens.font.line_height.sm};
`;

const OriginalPrice = styled(MemberPrice)`
  color: ${tokens.font.color.secondary};
  text-decoration: line-through;
`;

interface MerchCardProps {
  imageUrl: string;
  url: string;
  originalPrice: number;
  memberPrice: number;
}
const MerchCard = ({ imageUrl, url, originalPrice, memberPrice }: MerchCardProps) => (
  <Container>
    <Image src={imageUrl} alt="" />
    <Content>
      <Name>&quot;Rich&quot; Merch Bag</Name>
      <BottomContainer>
        <PriceContainer>
          <OriginalPrice>{originalPrice}</OriginalPrice>
          <MemberPrice>{memberPrice}</MemberPrice>
          <Label>Member Price</Label>
        </PriceContainer>
        <PillLink href={url}>Buy</PillLink>
      </BottomContainer>
    </Content>
  </Container>
);

const merch = [
  {
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/coral-c373f.appspot.com/o/collections%2F0x0A44A924770842862657898dc22ce36511DDeF4c%2Fimage.png?alt=media&token=5b8f7a55-b16c-44d7-9add-8891f6053f1a',
    url: '#',
    originalPrice: 20,
    memberPrice: 15,
  },
  {
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/coral-c373f.appspot.com/o/collections%2F0x0A44A924770842862657898dc22ce36511DDeF4c%2Fimage.png?alt=media&token=5b8f7a55-b16c-44d7-9add-8891f6053f1a',
    url: '#',
    originalPrice: 20,
    memberPrice: 15,
  },
  {
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/coral-c373f.appspot.com/o/collections%2F0x0A44A924770842862657898dc22ce36511DDeF4c%2Fimage.png?alt=media&token=5b8f7a55-b16c-44d7-9add-8891f6053f1a',
    url: '#',
    originalPrice: 20,
    memberPrice: 15,
  },
  {
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/coral-c373f.appspot.com/o/collections%2F0x0A44A924770842862657898dc22ce36511DDeF4c%2Fimage.png?alt=media&token=5b8f7a55-b16c-44d7-9add-8891f6053f1a',
    url: '#',
    originalPrice: 20,
    memberPrice: 15,
  },
  {
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/coral-c373f.appspot.com/o/collections%2F0x0A44A924770842862657898dc22ce36511DDeF4c%2Fimage.png?alt=media&token=5b8f7a55-b16c-44d7-9add-8891f6053f1a',
    url: '#',
    originalPrice: 20,
    memberPrice: 15,
  },
];
export const Merch = () => (
  <ScrollableContainer>
    {merch.map((merchProps, i) => (
      <MerchCard key={i} {...merchProps} />
    ))}
  </ScrollableContainer>
);
