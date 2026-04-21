interface EmptyStateProps {
  onCreateNew: () => void;
}

function EmptyState({ onCreateNew }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M50 10L70 20V70L50 80L30 70V20L50 10Z" fill="currentColor" opacity="0.1" />
        </svg>
      </div>
      <h2 className="empty-state-title">There is nothing here</h2>
      <p className="empty-state-text">
        Create an invoice by clicking the <strong>New Invoice</strong> button and get started
      </p>
    </div>
  );
}

export default EmptyState;
