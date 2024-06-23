import { QueryActionCreatorResult } from '@reduxjs/toolkit/query';
import { useCallback, useMemo, useState } from 'react';

export const useRefreshQuery = (
  cb: () => QueryActionCreatorResult<any>,
  options: { isEnabled?: boolean } = {
    isEnabled: true,
  },
) => {
  const [isRefreshing, setRefreshing] = useState<boolean>(false);

  const isRefreshingMemo = useMemo(() => isRefreshing, [isRefreshing]);

  const refresh = useCallback(async () => {
    try {
      if (!options.isEnabled) {
        return;
      }
      if (isRefreshing) {
        return;
      }
      setRefreshing(true);
      await cb();
    } catch (err) {
    } finally {
      setRefreshing(false);
    }
  }, [cb, isRefreshing, options.isEnabled]);

  return { isRefreshing: isRefreshingMemo, refresh };
};
