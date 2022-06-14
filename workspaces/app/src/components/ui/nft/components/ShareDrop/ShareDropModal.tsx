import { ShareModal } from 'components/ui';
import { ShareCard } from 'components/ui/nft';
import { Artist } from 'libraries/models';

interface ShareDropProps {
  name: string;
  id: string;
  closeShareModal: () => void;
  imageUrl: string;
  artistName: Artist['name'];
  artistProfilePhoto: Artist['profilePhoto'];
  description: string;
  Badge: () => JSX.Element;
}
export const ShareDropModal = ({
  name,
  closeShareModal,
  imageUrl,
  artistName,
  artistProfilePhoto,
  description,
  Badge,
  id,
}: ShareDropProps) => (
  <ShareModal
    title={'Share Drop'}
    url={`${window.location.origin}/collection/${id}`}
    postTitle={name}
    closeShareModal={closeShareModal}
  >
    <ShareCard
      imageUrl={imageUrl}
      artistName={artistName}
      artistProfilePhoto={artistProfilePhoto}
      isCard={true}
      title={name}
      titleHeadingLevel={2}
      titleStyleVariant={'h3'}
      description={description}
      Badge={Badge}
    />
  </ShareModal>
);
