import { QueryActionCreatorResult } from '@reduxjs/toolkit/query';
import { useCallback, useState } from 'react';

export const useRefreshingQuery = (
  cb: () => QueryActionCreatorResult<any>,
  options: { isEnabled?: boolean } = {
    isEnabled: true,
  },
) => {
  const [isRefreshing, setRefreshing] = useState<boolean>(false);

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

  return { isRefreshing, setRefreshing, refresh };
};
