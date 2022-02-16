import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { useUserUid } from 'libraries/models';
import { ChangeEvent, useCallback, useState } from 'react';

export const useImageUpload = () => {
  const uid = useUserUid();

  const [localImageUrl, setLocalImageUrl] = useState<string>();
  const [imageFile, setImageFile] = useState<File>();
  const [isImageUploading, setIsImageUploading] = useState(false);
  const handleImageFileChange = useCallback(
    ({ target: { files } }: ChangeEvent<HTMLInputElement>) => {
      if (files instanceof FileList) {
        const image = files[0];
        setImageFile(image);
        setLocalImageUrl(URL.createObjectURL(image));
      }
    },
    []
  );

  const handleImageUpload = useCallback(async () => {
    setIsImageUploading(true);
    if (uid === undefined) {
      throw Error(
        'useImageUpload hook handleImageUpload function should not be called if the user is not logged in.'
      );
    } else {
      try {
        const storage = getStorage();
        const imageRef = ref(storage, `${uid}/profile-photo`);
        const result = await uploadBytes(imageRef, imageFile as File);
        const downloadUrl = await getDownloadURL(result.ref);
        console.log(downloadUrl);
      } catch (error) {
      } finally {
        setIsImageUploading(false);
      }
    }
  }, [uid, imageFile]);

  return { localImageUrl, isImageUploading, handleImageFileChange, handleImageUpload };
};
