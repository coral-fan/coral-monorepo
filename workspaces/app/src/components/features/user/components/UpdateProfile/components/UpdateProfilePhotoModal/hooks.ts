import { useIsUpdateProfilePhotoModalOpen } from 'components/features/user/hooks';
import { OffsetPercentages } from 'components/ui';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { upsertUser, useUserUid } from 'libraries/models';
import { useRefetchPageData } from 'libraries/utils';
import { ChangeEvent, useCallback, useState } from 'react';

export const useUpdateProfilePhoto = (initialSrc: string) => {
  const uid = useUserUid();

  const [src, setSrc] = useState<string>(initialSrc);
  const [imageFile, setImageFile] = useState<File>();
  const [isProfilePhotoUpdating, setIsProfilePhotoUpdating] = useState(false);
  const [isProfilePhotoSame, setIsProfilePhotoSame] = useState(true);

  const handleImageFileChange = useCallback(
    ({ target: { files } }: ChangeEvent<HTMLInputElement>) => {
      if (files instanceof FileList) {
        const image = files[0];
        setImageFile(image);
        setSrc(URL.createObjectURL(image));
        setIsProfilePhotoSame(false);
      }
    },
    []
  );
  const refetchPageData = useRefetchPageData();
  const [, setIsModalOpen] = useIsUpdateProfilePhotoModalOpen();

  const updateProfilePhoto = useCallback(
    async (offsetPercentages: OffsetPercentages, scale: number) => {
      setIsProfilePhotoUpdating(true);
      if (uid === undefined) {
        throw Error(
          'useImageUpload hook handleImageUpload function should not be called if the user is not logged in.'
        );
      } else {
        try {
          if (imageFile === undefined) {
            await upsertUser(uid, {
              profilePhoto: { src: initialSrc, offsetPercentages, scale },
            });
          } else {
            const storage = getStorage();
            const imageRef = ref(storage, `${uid}/profile-photo`);
            const result = await uploadBytes(imageRef, imageFile);
            const downloadUrl = await getDownloadURL(result.ref);
            await upsertUser(uid, {
              profilePhoto: { src: downloadUrl, offsetPercentages, scale },
            });
          }

          await refetchPageData();
          setIsModalOpen(false);
        } catch (error) {
        } finally {
          setIsProfilePhotoUpdating(false);
        }
      }
    },
    [uid, imageFile]
  );

  return {
    src,
    handleImageFileChange,
    isProfilePhotoSame,
    updateProfilePhoto,
    isProfilePhotoUpdating,
  };
};
