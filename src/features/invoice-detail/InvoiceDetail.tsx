import { useState } from "react";
import type { Invoice } from "../../types/invoice";
import StatusBadge from "../common/StatusBadge";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";

interface InvoiceDetailProps {
  invoice: Invoice;
  onEdit: () => void;
  onDelete: () => void;
  onMarkAsPaid: () => void;
  onBack: () => void;
}

function InvoiceDetail({
  invoice,
  onEdit,
  onDelete,
  onMarkAsPaid,
  onBack,
}: InvoiceDetailProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const dueDate = new Date(invoice.invoiceDate);
  const paymentTermsDays = {
    net1: 1,
    net7: 7,
    net14: 14,
    net30: 30,
  };
  dueDate.setDate(dueDate.getDate() + paymentTermsDays[invoice.paymentTerms]);

  const total = invoice.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0,
  );

  const handleDeleteClick = () => {
    onDelete();
    setShowDeleteConfirm(false);
  };

  return (
    <div className="invoice-detail-container">
      <div className="invoice-detail-header">
        <button className="btn-back" onClick={onBack}>
          ← Go back
        </button>
      </div>

      <div className="invoice-detail-top">
        <div className="invoice-detail-status">
          <span className="status-label">Status</span>
          <StatusBadge status={invoice.status} />
        </div>

        <div className="invoice-detail-actions">
          <button className="btn btn-secondary" onClick={onEdit}>
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => setShowDeleteConfirm(true)}
          >
            Delete
          </button>
          {invoice.status !== "paid" && (
            <button className="btn btn-primary" onClick={onMarkAsPaid}>
              Mark as Paid
            </button>
          )}
        </div>
      </div>

      <div className="invoice-detail-content">
        <div className="invoice-detail-main">
          <div className="invoice-header-info">
            <div>
              <h2 className="invoice-id">{invoice.id}</h2>
              <p className="invoice-description">
                {invoice.projectDescription}
              </p>
            </div>
            <div className="invoice-from-address">
              <p>{invoice.billFrom.street}</p>
              <p>{invoice.billFrom.city}</p>
              <p>{invoice.billFrom.postCode}</p>
              <p>{invoice.billFrom.country}</p>
            </div>
          </div>

          <div className="invoice-meta-grid">
            <div className="meta-item">
              <span className="meta-label">Invoice Date</span>
              <span className="meta-value">
                {invoice.invoiceDate.toLocaleDateString("en-GB")}
              </span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Payment Due</span>
              <span className="meta-value">
                {dueDate.toLocaleDateString("en-GB")}
              </span>
            </div>

            <div className="meta-item">
              <span className="meta-label">Bill To</span>
              <div className="bill-to-info">
                <p className="meta-value">{invoice.billTo.name}</p>
                <p>{invoice.billTo.address.street}</p>
                <p>{invoice.billTo.address.city}</p>
                <p>{invoice.billTo.address.postCode}</p>
                <p>{invoice.billTo.address.country}</p>
              </div>
            </div>

            <div className="meta-item">
              <span className="meta-label">Sent to</span>
              <span className="meta-value">{invoice.billTo.email}</span>
            </div>
          </div>

          <div className="invoice-items">
            <table className="items-table">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>QTY.</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td className="qty-cell">{item.quantity}</td>
                    <td className="price-cell">£{item.price.toFixed(2)}</td>
                    <td className="total-cell">
                      £{(item.quantity * item.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="invoice-total">
            <span className="total-label">Amount Due</span>
            <span className="total-value">£{total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {showDeleteConfirm && (
        <ConfirmDeleteModal
          invoiceId={invoice.id}
          onConfirm={handleDeleteClick}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </div>
  );
}

export default InvoiceDetail;
