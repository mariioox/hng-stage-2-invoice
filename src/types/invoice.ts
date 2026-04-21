export type InvoiceStatus = 'draft' | 'pending' | 'paid';

export interface Address {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

export interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Invoice {
  id: string;
  billFrom: Address;
  billTo: {
    name: string;
    email: string;
    address: Address;
  };
  invoiceDate: Date;
  paymentTerms: 'net1' | 'net7' | 'net14' | 'net30';
  projectDescription: string;
  items: InvoiceItem[];
  status: InvoiceStatus;
  createdAt?: Date;
}
