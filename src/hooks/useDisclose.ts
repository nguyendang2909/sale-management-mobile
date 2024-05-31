import { useCallback, useMemo, useState } from 'react';

export function useDisclose(initState?: boolean) {
  const [isOpen, setIsOpen] = useState(initState || false);

  const isOpenMemo = useMemo(() => isOpen, [isOpen]);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onToggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return {
    isOpen: isOpenMemo,
    onOpen,
    onClose,
    onToggle,
  };
}
