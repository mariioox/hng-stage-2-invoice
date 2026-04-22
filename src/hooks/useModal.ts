import { useState, useCallback } from 'react';

export type ModalType = 'list' | 'create' | 'edit' | 'detail' | 'delete' | null;

export function useModal(initialType: ModalType = 'list') {
  const [modalType, setModalType] = useState<ModalType>(initialType);

  const open = useCallback((type: ModalType) => {
    setModalType(type);
  }, []);

  const close = useCallback(() => {
    setModalType(null);
  }, []);

  const isOpen = useCallback((type: ModalType) => {
    return modalType === type;
  }, [modalType]);

  return {
    modalType,
    open,
    close,
    isOpen,
    isFormOpen: modalType === 'create' || modalType === 'edit',
  };
}
