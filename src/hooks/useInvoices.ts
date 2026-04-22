import { useState, useCallback } from 'react';
import type { Invoice } from '../types/invoice';

export function useInvoices(initialInvoices: Invoice[] = []) {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [filterStatus, setFilterStatus] = useState<'Filter by status' | 'draft' | 'pending' | 'paid'>('Filter by status');

  // Filter invoices by status
  const filteredInvoices = useCallback(() => {
    if (filterStatus === 'Filter by status') return invoices;
    return invoices.filter(inv => inv.status === filterStatus);
  }, [invoices, filterStatus]);

  // Add new invoice
  const addInvoice = useCallback((invoice: Invoice) => {
    const newInvoice = {
      ...invoice,
      id: `#${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      createdAt: new Date(),
    };
    setInvoices(prev => [...prev, newInvoice]);
    return newInvoice;
  }, []);

  // Update existing invoice
  const updateInvoice = useCallback((id: string, updatedInvoice: Invoice) => {
  let updated: Invoice | null = null;
  setInvoices(prev => {
    const newInvoices = prev.map(inv => {
      if (inv.id === id) {updated = { ...updatedInvoice, id };
        return updated;
      }
      return inv;
    });
    return newInvoices;
  });
  return updated;
  }, []);

  // Delete invoice
  const deleteInvoice = useCallback((id: string) => {
    setInvoices(prev => prev.filter(inv => inv.id !== id));
  }, []);

  // Mark invoice as paid
  const markAsPaid = useCallback((id: string) => {
    setInvoices(prev =>
      prev.map(inv => inv.id === id ? { ...inv, status: 'paid' } : inv)
    );
  }, []);

  // Get invoice by ID
  const getInvoiceById = useCallback((id: string) => {
    return invoices.find(inv => inv.id === id);
  }, [invoices]);

  return {
    invoices,
    filteredInvoices: filteredInvoices(),
    filterStatus,
    setFilterStatus,
    addInvoice,
    updateInvoice,
    deleteInvoice,
    markAsPaid,
    getInvoiceById,
  };
}
