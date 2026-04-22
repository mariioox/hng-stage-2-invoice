import type { InvoiceItem } from "../../types/invoice";

interface InvoiceItemsListProps {
  items: InvoiceItem[];
  setItems: (items: InvoiceItem[]) => void;
}

function InvoiceItemsList({ items, setItems }: InvoiceItemsListProps) {
  const handleAddItem = () => {
    setItems([...items, { name: "", quantity: 1, price: 0 }]);
  };

  const handleUpdateItem = (
    index: number,
    field: keyof InvoiceItem,
    value: string | number,
  ) => {
    const newItems = [...items];
    if (field === "quantity" || field === "price") {
      newItems[index][field] = Number(value);
    } else {
      newItems[index][field] = value as string;
    }
    setItems(newItems);
  };

  const handleDeleteItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="items-list">
      <table className="items-table-edit">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Qty.</th>
            <th>Price</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) =>
                    handleUpdateItem(index, "name", e.target.value)
                  }
                  placeholder="Item Name"
                  className="item-input"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleUpdateItem(index, "quantity", e.target.value)
                  }
                  placeholder="1"
                  className="item-input item-qty"
                  min="1"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.price}
                  onChange={(e) =>
                    handleUpdateItem(index, "price", e.target.value)
                  }
                  placeholder="0.00"
                  className="item-input item-price"
                  step="0.01"
                />
              </td>
              <td className="item-total">
                £{(item.quantity * item.price).toFixed(2)}
              </td>
              <td>
                <button
                  type="button"
                  className="btn-delete-item"
                  onClick={() => handleDeleteItem(index)}
                  title="Delete item"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.5 3H10.5V1.5C10.5 1.1 10.2 0.8 9.8 0.8H6.2C5.8 0.8 5.5 1.1 5.5 1.5V3H2.5C2.1 3 1.8 3.3 1.8 3.7C1.8 4.1 2.1 4.4 2.5 4.4H3.5V12.5C3.5 13.3 4.2 14 5 14H11C11.8 14 12.5 13.3 12.5 12.5V4.4H13.5C13.9 4.4 14.2 4.1 14.2 3.7C14.2 3.3 13.9 3 13.5 3ZM6.5 2.5H9.5V3H6.5V2.5ZM11 12.5H5V4.4H11V12.5Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        type="button"
        className="btn btn-add-item"
        onClick={handleAddItem}
      >
        + Add New Item
      </button>
    </div>
  );
}

export default InvoiceItemsList;
