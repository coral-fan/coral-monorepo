import { Flex } from 'components/layout';
import { Avatar } from 'components/ui/Profile';
import { infoSizeDictionary } from './consts';
import { Name } from './Name';
import { Username } from './Username';

type Size = keyof typeof infoSizeDictionary;

export interface InfoProps {
  name: string;
  username: string;
  src: string;
  size: Size;
}

export const Info = ({ src, name, username, size }: InfoProps) => {
  const gapSize = `${infoSizeDictionary[size].avatarGap}px`;
  const avatarSize = infoSizeDictionary[size].avatarSize;

  return (
    <Flex direction={'row'} alignItems={'center'} gap={gapSize} width={'100%'}>
      <Avatar size={avatarSize} src={src} hasBorder={false} />
      <Flex direction={'column'}>
        <Name size={size}>{name}</Name>
        <Username size={size}>{username}</Username>
      </Flex>
    </Flex>
  );
};
