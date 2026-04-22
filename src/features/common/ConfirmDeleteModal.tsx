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
  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onCancel} role="presentation" />
      <div className="modal-content">
        <h2>Confirm Deletion</h2>
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
