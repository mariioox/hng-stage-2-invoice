import type { InvoiceStatus } from "../../types/invoice";

interface StatusBadgeProps {
  status: InvoiceStatus;
}

function StatusBadge({ status }: StatusBadgeProps) {
  const statusConfig = {
    draft: { label: "Draft", class: "status-draft" },
    pending: { label: "Pending", class: "status-pending" },
    paid: { label: "Paid", class: "status-paid" },
  };

  const config = statusConfig[status];

  return (
    <div className={`status-badge ${config.class}`}>
      <span className="status-dot"></span>
      <span className="status-text">{config.label}</span>
    </div>
  );
}

export default StatusBadge;
