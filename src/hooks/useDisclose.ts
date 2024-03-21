import { useState } from 'react';

export function useDisclose(initState?: boolean) {
  const [isOpen, setIsOpen] = useState(initState || false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const onToggle = () => {
    setIsOpen(prev => !prev);
  };

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
  };
}
