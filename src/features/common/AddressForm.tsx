import type { Address } from "../../types/invoice";

interface AddressFormProps {
  address: Address;
  onChange: (address: Address) => void;
  hasError?: boolean;
}

function AddressForm({ address, onChange, hasError }: AddressFormProps) {
  const handleChange = (field: keyof Address, value: string) => {
    onChange({ ...address, [field]: value });
  };

  return (
    <div className="address-form">
      <div className="form-group">
        <label htmlFor="street">Street Address</label>
        <input
          id="street"
          type="text"
          value={address.street}
          onChange={(e) => handleChange("street", e.target.value)}
          className={hasError ? "input-error" : ""}
          placeholder="Street Address"
        />
      </div>

      <div className="form-row-three-cols">
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            value={address.city}
            onChange={(e) => handleChange("city", e.target.value)}
            className={hasError ? "input-error" : ""}
            placeholder="City"
          />
        </div>

        <div className="form-group">
          <label htmlFor="postCode">Post Code</label>
          <input
            id="postCode"
            type="text"
            value={address.postCode}
            onChange={(e) => handleChange("postCode", e.target.value)}
            className={hasError ? "input-error" : ""}
            placeholder="Post Code"
          />
        </div>

        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input
            id="country"
            type="text"
            value={address.country}
            onChange={(e) => handleChange("country", e.target.value)}
            className={hasError ? "input-error" : ""}
            placeholder="Country"
          />
        </div>
      </div>
    </div>
  );
}

export default AddressForm;
