import type { Invoice } from "../../types/invoice";
import { useState } from "react";
import EmptyState from "../common/EmptyState";
import InvoiceRow from "./InvoiceRow";
import arrowDown from "./arrow_down.png";

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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="invoices-list-container">
      <div className="invoices-list-header">
        <div className="invoices-list-header-content">
          <h1>Invoices</h1>
          <p className="invoices-count">
            {invoices.length === 0
              ? "No invoices"
              : `${invoices.length} ${filterStatus === "Filter by status" ? "total" : filterStatus} invoices`}
          </p>
        </div>

        <div className="invoices-list-controls">
          <div className="filter-dropdown-wrapper">
            <button
              className="filter-trigger"
              onClick={() => setIsOpen(!isOpen)}
            >
              Filter<span>by status</span>
              <img
                src={`${arrowDown}`}
                alt=""
                width="25"
                height="25"
                className={isOpen ? "rotate" : ""}
              />
            </button>

            {isOpen && (
              <div className="filter-menu">
                {(["draft", "pending", "paid"] as const).map((status) => (
                  <label key={status} className="filter-option">
                    <input
                      type="checkbox"
                      checked={filterStatus === status}
                      onChange={() => onFilterChange(status)}
                    />
                    <span className="checkbox-custom"></span>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </label>
                ))}
              </div>
            )}
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
