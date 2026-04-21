import { useState } from "react";
import type { Invoice, Address } from "../../types/invoice";
import AddressForm from "../common/AddressForm";
import InvoiceItemsList from "../common/InvoiceItemsList";

interface InvoiceFormProps {
  initialData?: Invoice;
  onSubmit: (invoice: Invoice) => void;
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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
      status: initialData?.status || "draft",
    };

    onSubmit(invoice);
  };

  return (
    <div className="invoice-form-container">
      <div className="invoice-form-header">
        <button className="btn-back" onClick={onCancel}>
          ← Go back
        </button>
        <h1>{isEditing ? `Edit #${initialData?.id}` : "New Invoice"}</h1>
      </div>

      <form className="invoice-form" onSubmit={handleSubmit}>
        <div className="invoice-form-content">
          <div className="invoice-form-main">
            {errors.length > 0 && (
              <div className="form-errors">
                {errors.map((error, index) => (
                  <p key={index} className="error-message">
                    {error}
                  </p>
                ))}
              </div>
            )}

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
                    errors.some((e) => e.includes("Client name"))
                      ? "input-error"
                      : ""
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
              {errors.some((e) => e.includes("At least one item")) && (
                <p className="error-message">* All fields must be added</p>
              )}
            </section>
          </div>

          <div className="invoice-form-sidebar">
            <div className="form-preview">
              <h3>Preview</h3>
              <div className="preview-content">
                <div className="preview-item">
                  <span>Total</span>
                  <span className="preview-value">
                    £
                    {items
                      .reduce(
                        (sum, item) => sum + item.quantity * item.price,
                        0,
                      )
                      .toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="invoice-form-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Discard
          </button>
          <button type="submit" className="btn btn-primary">
            {isEditing ? "Save Changes" : "Save & Send"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default InvoiceForm;
