import { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Sidebar from "./features/common/Sidebar";
import MainLayout from "./components/Layout/MainLayout";
import Modal from "./components/Modal/Modal";
import InvoiceForm from "./features/invoice-form/InvoiceForm";
import ConfirmDeleteModal from "./features/common/ConfirmDeleteModal";
import InvoicesList from "./features/invoices/InvoicesList";
import InvoiceDetail from "./features/invoice-detail/InvoiceDetail";
import { useInvoices } from "./hooks/useInvoices";
import { useModal } from "./hooks/useModal";
import type { Invoice } from "./types/invoice";
import "./index.css";
import "./styles/modal.css";

function AppContent() {
  // State management
  const invoices = useInvoices();
  const modal = useModal("list");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  // ============================================
  // FORM SUBMISSION HANDLERS
  // ============================================

  const handleCreateInvoice = (
    invoice: Invoice,
    status: "draft" | "pending",
  ) => {
    invoices.addInvoice({ ...invoice, status });
    modal.open("list");
  };

  const handleUpdateInvoice = (
    invoice: Invoice,
    status: "draft" | "pending",
  ) => {
    if (selectedInvoice) {
      invoices.updateInvoice(selectedInvoice.id, { ...invoice, status });
      // Update selected invoice to show changes
      const updated = invoices.getInvoiceById(selectedInvoice.id);
      if (updated) setSelectedInvoice(updated);
      modal.open("detail");
    }
  };

  const handleDeleteInvoice = () => {
    if (selectedInvoice) {
      invoices.deleteInvoice(selectedInvoice.id);
      modal.open("list");
    }
  };

  const handleMarkAsPaid = () => {
    if (selectedInvoice) {
      invoices.markAsPaid(selectedInvoice.id);
      const updated = invoices.getInvoiceById(selectedInvoice.id);
      if (updated) setSelectedInvoice(updated);
    }
  };

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="app">
      <Sidebar />

      <MainLayout>
        {/* LIST VIEW - Full page */}
        {modal.modalType === "list" && (
          <InvoicesList
            invoices={invoices.filteredInvoices}
            filterStatus={invoices.filterStatus}
            onFilterChange={invoices.setFilterStatus}
            onCreateNew={() => {
              setSelectedInvoice(null);
              modal.open("create");
            }}
            onSelectInvoice={(invoice) => {
              setSelectedInvoice(invoice);
              modal.open("detail");
            }}
          />
        )}

        {/* DETAIL VIEW - Full page */}
        {modal.modalType === "detail" && selectedInvoice && (
          <InvoiceDetail
            invoice={selectedInvoice}
            onEdit={() => modal.open("edit")}
            onDelete={() => modal.open("delete")}
            onMarkAsPaid={handleMarkAsPaid}
            onBack={() => modal.open("list")}
          />
        )}
      </MainLayout>

      {/* ============================================
          MODAL OVERLAYS (Slide-in from left)
          ============================================ */}

      {/* CREATE/EDIT FORM MODAL - Side panel */}
      <Modal
        isOpen={modal.modalType === "create" || modal.modalType === "edit"}
        onClose={() => {
          if (modal.modalType === "create") {
            modal.open("list");
          } else if (modal.modalType === "edit") {
            modal.open("detail");
          }
        }}
      >
        {(modal.modalType === "create" || modal.modalType === "edit") && (
          <InvoiceForm
            initialData={selectedInvoice || undefined}
            isEditing={modal.modalType === "edit"}
            onSubmit={
              modal.modalType === "edit"
                ? handleUpdateInvoice
                : handleCreateInvoice
            }
            onCancel={() => {
              if (modal.modalType === "create") {
                modal.open("list");
              } else {
                modal.open("detail");
              }
            }}
          />
        )}
      </Modal>

      {/* DELETE CONFIRMATION MODAL - Small modal */}
      <ConfirmDeleteModal
        isOpen={modal.modalType === "delete"}
        invoiceId={selectedInvoice?.id}
        onConfirm={handleDeleteInvoice}
        onCancel={() => modal.open("detail")}
      />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
