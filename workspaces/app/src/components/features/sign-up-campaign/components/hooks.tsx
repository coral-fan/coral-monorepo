import { useCallback, useState } from 'react';

export const useModal = (initialState = false) => {
  const [isModalOpen, setIsModalOpen] = useState(initialState);
  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  return { isModalOpen, openModal, closeModal };
};
