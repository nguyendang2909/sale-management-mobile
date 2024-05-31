import { useEffect, useMemo, useState } from 'react';

export const useInit = () => {
  const [isInit, setInit] = useState<boolean>(false);

  const isInitMemo = useMemo(() => isInit, [isInit]);

  useEffect(() => {
    if (!isInit) {
      setInit(true);
    }
  }, [isInit]);

  return { isInit: isInitMemo };
};
