import React from "react";
import { useAccessibleModal } from "../../hooks/useAccessibleModal";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  showOverlay?: boolean;
}

function Modal({
  isOpen,
  onClose,
  title,
  children,
  showOverlay = true,
}: ModalProps) {
  const { modalRef } = useAccessibleModal(isOpen, onClose);

  if (!isOpen) return null;

  return (
    <>
      {showOverlay && (
        <div
          className="modal-overlay"
          onClick={onClose}
          role="presentation"
          aria-hidden="true"
        />
      )}

      <div
        className="modal-panel"
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={title || "Modal"}
      >
        <div className="modal-panel-content">{children}</div>
      </div>
    </>
  );
}

export default Modal;
