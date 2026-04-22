import { useState, useCallback, useEffect } from 'react';
import type { Invoice } from '../types/invoice';

const STORAGE_KEY = 'invoices_data';

export function useInvoices(initialInvoices: Invoice[] = []) {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'Filter by status' | 'draft' | 'pending' | 'paid'>('Filter by status');

  // Load invoices from LocalStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Convert date strings back to Date objects
        const invoicesWithDates = parsed.map((inv: any) => ({
          ...inv,
          invoiceDate: new Date(inv.invoiceDate),
          createdAt: inv.createdAt ? new Date(inv.createdAt) : undefined,
        }));
        setInvoices(invoicesWithDates);
      } else if (initialInvoices.length > 0) {
        setInvoices(initialInvoices);
      }
    } catch (error) {
      console.error('Failed to load invoices from localStorage:', error);
      if (initialInvoices.length > 0) {
        setInvoices(initialInvoices);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save invoices to LocalStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices));
      } catch (error) {
        console.error('Failed to save invoices to localStorage:', error);
      }
    }
  }, [invoices, isLoaded]);

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
    let result: Invoice | null = null;
    setInvoices(prev => {
      const newInvoices = prev.map(inv => {
        if (inv.id === id) {
          result = { ...updatedInvoice, id };
          return result;
        }
        return inv;
      });
      return newInvoices;
    });
    return result;
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
    isLoaded,
  };
}