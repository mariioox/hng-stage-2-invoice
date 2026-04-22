import { useEffect, useRef, useCallback } from 'react';


export function useAccessibleModal(isOpen: boolean, onClose: () => void) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Handle ESC key press
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
    }
  }, [onClose]);

  // Handle focus trap (keep focus within modal)
  const handleTabKey = useCallback((event: KeyboardEvent) => {
    if (event.key !== 'Tab' || !modalRef.current) return;

    const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const activeElement = document.activeElement as HTMLElement;

    // Shift+Tab on first element - move to last
    if (event.shiftKey && activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    }
    // Tab on last element - move to first
    else if (!event.shiftKey && activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }, []);

  // Combined keyboard handler
  const handleKeyboardEvents = useCallback((event: KeyboardEvent) => {
    handleKeyDown(event);
    handleTabKey(event);
  }, [handleKeyDown, handleTabKey]);

  // Open modal - trap focus and listen for ESC
  useEffect(() => {
    if (!isOpen) return;

    // Store the currently focused element to restore later
    previousActiveElement.current = document.activeElement as HTMLElement;

    // Add event listeners
    document.addEventListener('keydown', handleKeyboardEvents);

    // Focus the modal or first focusable element
    if (modalRef.current) {
      const focusableElement = modalRef.current.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElement) {
        focusableElement.focus();
      } else {
        modalRef.current.focus();
      }
    }

    // Cleanup - restore focus and remove listeners when modal closes
    return () => {
      document.removeEventListener('keydown', handleKeyboardEvents);
      // Restore focus to the element that opened the modal
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen, handleKeyboardEvents]);

  return { modalRef };
}
