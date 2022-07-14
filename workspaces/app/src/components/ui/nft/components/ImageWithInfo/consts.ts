import { Photo } from 'libraries/models';

export const IMAGE_WITH_INFO_DEFAULT_ARGS = {
  imageUrl: 'https://www.stereofox.com/images/86513/resized.jpg',
  creatorName: 'Bonobo',
  creatorProfilePhoto: {
    src: 'https://www.stereofox.com/images/86513/resized.jpg',
    offsetPercentages: [0, 0],
    scale: 1,
  } as Photo,
  artistId: '1',
};
