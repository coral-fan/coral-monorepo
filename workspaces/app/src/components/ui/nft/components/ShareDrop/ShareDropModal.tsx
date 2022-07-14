import { ShareModal } from 'components/ui';
import { ShareCard } from 'components/ui/nft';
import { Photo } from 'libraries/models';

interface ShareDropProps {
  name: string;
  id: string;
  closeShareModal: () => void;
  imageUrl: string;
  creatorName: string;
  creatorArtistPhoto: Photo;
  description: string;
  Badge: () => JSX.Element;
}
export const ShareDropModal = ({
  name,
  closeShareModal,
  imageUrl,
  creatorName,
  creatorArtistPhoto,
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
      creatorName={creatorName}
      creatorProfilePhoto={creatorArtistPhoto}
      isCard={true}
      title={name}
      titleHeadingLevel={2}
      titleStyleVariant={'h3'}
      description={description}
      Badge={Badge}
    />
  </ShareModal>
);
