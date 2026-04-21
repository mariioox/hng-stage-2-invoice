interface ConfirmDeleteModalProps {
  invoiceId: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmDeleteModal({ invoiceId, onConfirm, onCancel }: ConfirmDeleteModalProps) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirm Deletion</h2>
        <p>
          Are you sure you want to delete invoice <strong>{invoiceId}</strong>? This action cannot be undone.
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
    </div>
  );
}

export default ConfirmDeleteModal;
