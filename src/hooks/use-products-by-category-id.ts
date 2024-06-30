import { useMemo } from 'react';
import { useFetchAllProductsByCategoryIdQuery } from 'src/api';
import { UseQuerySubscriptionOptions } from 'src/types';

import { useRefreshQuery } from './use-refreshing-query';

export const useProductsByCategoryId = (
  { categoryId }: { categoryId: string },
  options?: UseQuerySubscriptionOptions,
) => {
  const { data: fetchedData, ...restQuery } = useFetchAllProductsByCategoryIdQuery(
    categoryId,
    options,
  );

  const data = useMemo(() => fetchedData?.data || [], [fetchedData?.data]);

  const refreshQuery = useRefreshQuery(restQuery.refetch);

  return {
    data: data || [],
    ...restQuery,
    ...refreshQuery,
  };
};
