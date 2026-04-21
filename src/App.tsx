import { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Sidebar from "./features/common/Sidebar";
import type { Invoice } from "./types/invoice";
import InvoicesList from "./features/invoices/InvoicesList";
import InvoiceForm from "./features/invoice-form/InvoiceForm";
import InvoiceDetail from "./features/invoice-detail/InvoiceDetail";
import "./index.css";

type View = "list" | "create" | "edit" | "detail";

function AppContent() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [currentView, setCurrentView] = useState<View>("list");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [filterStatus, setFilterStatus] = useState<
    "Filter by status" | "draft" | "pending" | "paid"
  >("Filter by status");

  const handleCreateInvoice = (invoice: Invoice) => {
    const newInvoice = {
      ...invoice,
      id: `#${Date.now()}`,
      createdAt: new Date(),
    };
    setInvoices([...invoices, newInvoice]);
    setCurrentView("list");
  };

  const handleUpdateInvoice = (id: string, updatedInvoice: Invoice) => {
    setInvoices(
      invoices.map((inv) => (inv.id === id ? { ...updatedInvoice, id } : inv)),
    );
    setCurrentView("detail");
    setSelectedInvoice({ ...updatedInvoice, id });
  };

  const handleDeleteInvoice = (id: string) => {
    setInvoices(invoices.filter((inv) => inv.id !== id));
    setCurrentView("list");
  };

  const handleMarkAsPaid = (id: string) => {
    setInvoices(
      invoices.map((inv) => (inv.id === id ? { ...inv, status: "paid" } : inv)),
    );
    setSelectedInvoice(
      selectedInvoice ? { ...selectedInvoice, status: "paid" } : null,
    );
  };

  const filteredInvoices = invoices.filter((inv) => {
    if (filterStatus === "Filter by status") return true;
    return inv.status === filterStatus;
  });

  return (
    <div className="app">
      <Sidebar />
      <main className="app-main">
        {currentView === "list" && (
          <InvoicesList
            invoices={filteredInvoices}
            filterStatus={filterStatus}
            onFilterChange={setFilterStatus}
            onCreateNew={() => setCurrentView("create")}
            onSelectInvoice={(invoice) => {
              setSelectedInvoice(invoice);
              setCurrentView("detail");
            }}
          />
        )}

        {currentView === "create" && (
          <InvoiceForm
            onSubmit={handleCreateInvoice}
            onCancel={() => setCurrentView("list")}
          />
        )}

        {currentView === "detail" && selectedInvoice && (
          <InvoiceDetail
            invoice={selectedInvoice}
            onEdit={() => setCurrentView("edit")}
            onDelete={() => handleDeleteInvoice(selectedInvoice.id)}
            onMarkAsPaid={() => handleMarkAsPaid(selectedInvoice.id)}
            onBack={() => setCurrentView("list")}
          />
        )}

        {currentView === "edit" && selectedInvoice && (
          <InvoiceForm
            initialData={selectedInvoice}
            onSubmit={(data) => handleUpdateInvoice(selectedInvoice.id, data)}
            onCancel={() => {
              setCurrentView("detail");
            }}
            isEditing
          />
        )}
      </main>
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
