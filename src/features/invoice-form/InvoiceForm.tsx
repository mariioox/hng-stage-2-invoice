import { useState } from "react";
import type { Invoice, Address } from "../../types/invoice";
import AddressForm from "../common/AddressForm";
import InvoiceItemsList from "../common/InvoiceItemsList";

interface InvoiceFormProps {
  initialData?: Invoice;
  onSubmit: (invoice: Invoice, status: "draft" | "pending") => void;
  onCancel: () => void;
  isEditing?: boolean;
}

function InvoiceForm({
  initialData,
  onSubmit,
  onCancel,
  isEditing,
}: InvoiceFormProps) {
  const [billFromAddress, setBillFromAddress] = useState<Address>(
    initialData?.billFrom || {
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
  );

  const [clientName, setClientName] = useState(initialData?.billTo.name || "");
  const [clientEmail, setClientEmail] = useState(
    initialData?.billTo.email || "",
  );
  const [billToAddress, setBillToAddress] = useState<Address>(
    initialData?.billTo.address || {
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
  );

  const [invoiceDate, setInvoiceDate] = useState(
    initialData?.invoiceDate
      ? new Date(initialData.invoiceDate).toISOString().split("T")[0]
      : "",
  );

  const [paymentTerms, setPaymentTerms] = useState<
    "net1" | "net7" | "net14" | "net30"
  >(initialData?.paymentTerms || "net30");

  const [projectDescription, setProjectDescription] = useState(
    initialData?.projectDescription || "",
  );
  const [items, setItems] = useState(initialData?.items || []);
  const [errors, setErrors] = useState<string[]>([]);

  const validateForm = (): boolean => {
    const newErrors: string[] = [];

    if (!billFromAddress.street) newErrors.push("Bill From street is required");
    if (!billFromAddress.city) newErrors.push("Bill From city is required");
    if (!clientName) newErrors.push("Client name is required");
    if (!clientEmail) newErrors.push("Client email is required");
    if (!billToAddress.street) newErrors.push("Bill To street is required");
    if (!billToAddress.city) newErrors.push("Bill To city is required");
    if (!invoiceDate) newErrors.push("Invoice date is required");
    if (items.length === 0) newErrors.push("At least one item is required");

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (status: "draft" | "pending") => {
    if (!validateForm()) return;

    const invoice: Invoice = {
      id: initialData?.id || "",
      billFrom: billFromAddress,
      billTo: {
        name: clientName,
        email: clientEmail,
        address: billToAddress,
      },
      invoiceDate: new Date(invoiceDate),
      paymentTerms,
      projectDescription,
      items,
      status: isEditing ? initialData?.status || "draft" : status,
    };

    onSubmit(invoice, status);
  };

  return (
    <div className="invoice-form-modal">
      <h1 className="invoice-form-title">
        {isEditing ? `Edit #${initialData?.id}` : "New Invoice"}
      </h1>

      <section className="form-section">
        <h2 className="section-title">Bill From</h2>
        <AddressForm
          address={billFromAddress}
          onChange={setBillFromAddress}
          hasError={errors.some((e) => e.includes("Bill From"))}
        />
      </section>

      <section className="form-section">
        <h2 className="section-title">Bill To</h2>
        <div className="form-group">
          <label htmlFor="client-name">Client's Name</label>
          <input
            id="client-name"
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className={
              errors.some((e) => e.includes("Client name")) ? "input-error" : ""
            }
            placeholder="Client's Name"
          />
          {errors.some((e) => e.includes("Client name")) && (
            <span className="error-label">can't be empty</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="client-email">Client's Email</label>
          <input
            id="client-email"
            type="email"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            className={
              errors.some((e) => e.includes("Client email"))
                ? "input-error"
                : ""
            }
            placeholder="e.g. email@example.com"
          />
        </div>

        <AddressForm
          address={billToAddress}
          onChange={setBillToAddress}
          hasError={errors.some((e) => e.includes("Bill To"))}
        />
      </section>

      <section className="form-section form-row-two-cols">
        <div className="form-group">
          <label htmlFor="invoice-date">Invoice Date</label>
          <input
            id="invoice-date"
            type="date"
            value={invoiceDate}
            onChange={(e) => setInvoiceDate(e.target.value)}
            className={
              errors.some((e) => e.includes("Invoice date"))
                ? "input-error"
                : ""
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="payment-terms">Payment Terms</label>
          <select
            id="payment-terms"
            value={paymentTerms}
            onChange={(e) => setPaymentTerms(e.target.value as any)}
          >
            <option value="net1">Net 1 Day</option>
            <option value="net7">Net 7 Days</option>
            <option value="net14">Net 14 Days</option>
            <option value="net30">Net 30 Days</option>
          </select>
        </div>
      </section>

      <section className="form-section">
        <div className="form-group">
          <label htmlFor="project-description">Project Description</label>
          <input
            id="project-description"
            type="text"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            placeholder="e.g. Graphic Design Service"
          />
        </div>
      </section>

      <section className="form-section">
        <h2 className="section-title">Item List</h2>

        <InvoiceItemsList items={items} setItems={setItems} />

        {/* Show these errors ONLY below items */}
        {errors.some((e) => e.includes("Bill From street")) ||
        errors.some((e) => e.includes("Bill From city")) ||
        errors.some((e) => e.includes("Client name")) ||
        errors.some((e) => e.includes("Client email")) ||
        errors.some((e) => e.includes("Bill To street")) ||
        errors.some((e) => e.includes("Bill To city")) ||
        errors.some((e) => e.includes("Invoice date")) ? (
          <p className="error-message">-All fields must be added</p>
        ) : null}
        {errors.some((e) => e.includes("At least one item")) && (
          <p className="error-message">-An item must be added</p>
        )}
      </section>

      <div className="modal-form-footer">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          {isEditing ? "Cancel" : "Discard"}
        </button>
        {!isEditing && (
          <button
            type="button"
            className="btn btn-draft"
            onClick={() => handleSubmit("draft")}
          >
            Save as Draft
          </button>
        )}
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => handleSubmit(isEditing ? "draft" : "pending")}
        >
          {isEditing ? "Save Changes" : "Save & Send"}
        </button>
      </div>
    </div>
  );
}

export default InvoiceForm;
