import { useState, useCallback } from 'react';

export function useFormValidation() {
  const [errors, setErrors] = useState<string[]>([]);

  const validate = useCallback((
    data: {
      billFromStreet?: string;
      billFromCity?: string;
      clientName?: string;
      clientEmail?: string;
      billToStreet?: string;
      billToCity?: string;
      invoiceDate?: string;
      items?: any[];
    }
  ): boolean => {
    const newErrors: string[] = [];

    if (!data.billFromStreet) newErrors.push('Bill From street is required');
    if (!data.billFromCity) newErrors.push('Bill From city is required');
    if (!data.clientName) newErrors.push('Client name is required');
    if (!data.clientEmail) newErrors.push('Client email is required');
    if (!data.billToStreet) newErrors.push('Bill To street is required');
    if (!data.billToCity) newErrors.push('Bill To city is required');
    if (!data.invoiceDate) newErrors.push('Invoice date is required');
    if (!data.items || data.items.length === 0) newErrors.push('At least one item is required');

    setErrors(newErrors);
    return newErrors.length === 0;
  }, []);

  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);

  const hasError = useCallback((fieldName: string) => {
    return errors.some(error => error.includes(fieldName));
  }, [errors]);

  return {
    errors,
    validate,
    clearErrors,
    hasError,
  };
}
