import { useIsUpdateProfilePhotoModalOpen } from 'components/features/user/hooks';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { OffsetPercentages, useUpsertUser, useUserUid } from 'libraries/models';
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

  const upsertUser = useUpsertUser();

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
            const imageRef = ref(storage, `users/${uid}/profile-photo`);
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
    [imageFile, initialSrc, refetchPageData, setIsModalOpen, uid, upsertUser]
  );

  return {
    src,
    handleImageFileChange,
    isProfilePhotoSame,
    updateProfilePhoto,
    isProfilePhotoUpdating,
  };
};

export const useScale = (initialScale: number) => {
  const [scale, setScale] = useState(initialScale);

  const isScaleSame = scale === initialScale;

  return { scale, setScale, isScaleSame };
};

export const useOffsetPercentages = (initialOffsetPercentages: OffsetPercentages) => {
  const [offsetPercentages, setOffsetPercentages] = useState(initialOffsetPercentages);

  const isOffsetPercentagesSame = offsetPercentages.every(
    (offsetPercentage, i) => offsetPercentage === initialOffsetPercentages[i]
  );

  return { offsetPercentages, setOffsetPercentages, isOffsetPercentagesSame };
};
