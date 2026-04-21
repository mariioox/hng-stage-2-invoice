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
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        type="button"
        className="btn btn-secondary btn-add-item"
        onClick={handleAddItem}
      >
        + Add New Item
      </button>
    </div>
  );
}

export default InvoiceItemsList;
