import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  showOverlay?: boolean;
}

function Modal({ isOpen, onClose, title, children, showOverlay = true }: ModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {showOverlay && (
        <div 
          className="modal-overlay"
          onClick={onClose}
          role="presentation"
        />
      )}
      
      <div className="modal-panel">
        <div className="modal-panel-content">
          {children}
        </div>
      </div>
    </>
  );
}

export default Modal;
