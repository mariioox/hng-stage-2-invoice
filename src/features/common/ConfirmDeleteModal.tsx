import { useAccessibleModal } from "../../hooks/useAccessibleModal";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  invoiceId?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmDeleteModal({
  isOpen,
  invoiceId,
  onConfirm,
  onCancel,
}: ConfirmDeleteModalProps) {
  const { modalRef } = useAccessibleModal(isOpen, onCancel);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="modal-overlay"
        onClick={onCancel}
        role="presentation"
        aria-hidden="true"
      />
      <div
        className="modal-content"
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-modal-title"
      >
        <h2 id="delete-modal-title">Confirm Deletion</h2>
        <p>
          Are you sure you want to delete invoice <strong>{invoiceId}</strong>?
          This action cannot be undone.
        </p>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default ConfirmDeleteModal;
