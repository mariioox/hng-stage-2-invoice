import type { Invoice } from "../../types/invoice";
import EmptyState from "../common/EmptyState";
import InvoiceRow from "./InvoiceRow";

interface InvoicesListProps {
  invoices: Invoice[];
  filterStatus: "Filter by status" | "draft" | "pending" | "paid";
  onFilterChange: (
    status: "Filter by status" | "draft" | "pending" | "paid",
  ) => void;
  onCreateNew: () => void;
  onSelectInvoice: (invoice: Invoice) => void;
}

function InvoicesList({
  invoices,
  filterStatus,
  onFilterChange,
  onCreateNew,
  onSelectInvoice,
}: InvoicesListProps) {
  return (
    <div className="invoices-list-container">
      <div className="invoices-list-header">
        <div className="invoices-list-header-content">
          <h1>Invoices</h1>
          <p className="invoices-count">
            {invoices.length === 0
              ? "No invoices"
              : `There are ${invoices.length} ${filterStatus === "Filter by status" ? "total" : filterStatus} invoices`}
          </p>
        </div>

        <div className="invoices-list-controls">
          <div className="filter-dropdown-wrapper">
            <label htmlFor="status-filter">Filter by status</label>
            <select
              id="status-filter"
              className="filter-dropdown"
              value={filterStatus}
              onChange={(e) => onFilterChange(e.target.value as any)}
            >
              <option value="Filter by status">Filter by status</option>
              <option value="draft">Draft</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
            </select>
          </div>

          <button
            className="btn btn-primary btn-new-invoice"
            onClick={onCreateNew}
          >
            <span className="btn-icon">+</span>
            <span className="btn-text">New Invoice</span>
          </button>
        </div>
      </div>

      <div className="invoices-list-content">
        {invoices.length === 0 ? (
          <EmptyState onCreateNew={onCreateNew} />
        ) : (
          <div className="invoices-table">
            {invoices.map((invoice) => (
              <InvoiceRow
                key={invoice.id}
                invoice={invoice}
                onClick={() => onSelectInvoice(invoice)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default InvoicesList;
