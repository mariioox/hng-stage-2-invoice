import type { Invoice } from "../../types/invoice";
import StatusBadge from "../common/StatusBadge";

interface InvoiceRowProps {
  invoice: Invoice;
  onClick: () => void;
}

function InvoiceRow({ invoice, onClick }: InvoiceRowProps) {
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

  return (
    <div className="invoice-row" onClick={onClick}>
      <div className="invoice-row-id">
        <span className="invoice-id">{invoice.id}</span>
      </div>
      <div className="invoice-row-due">
        <span className="invoice-due-label">Due</span>
        <span className="invoice-due-date">
          {dueDate.toLocaleDateString("en-GB")}
        </span>
      </div>
      <div className="invoice-row-client">
        <span className="invoice-client-name">{invoice.billTo.name}</span>
      </div>
      <div className="invoice-row-amount">
        <span className="invoice-amount">£{total.toFixed(2)}</span>
      </div>
      <div className="invoice-row-status">
        <StatusBadge status={invoice.status} />
      </div>
      <div className="invoice-row-arrow">
        <span className="arrow-icon">›</span>
      </div>
    </div>
  );
}

export default InvoiceRow;
