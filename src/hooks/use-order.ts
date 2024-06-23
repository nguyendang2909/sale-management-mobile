import { useFetchOrderQuery } from 'src/api';
import { AppStore, UseQuerySubscriptionOptions } from 'src/types';

import { useRefreshQuery } from './use-refreshing-query';

export const useOrder = (detail: AppStore.Order, options?: UseQuerySubscriptionOptions) => {
  const { data: fetchedData, ...restQuery } = useFetchOrderQuery(detail.id, options);

  const data = fetchedData?.data || detail;

  const refreshQuery = useRefreshQuery(restQuery.refetch);

  return {
    ...restQuery,
    ...refreshQuery,
    data,
  };
};

export type RefetchOrder = ReturnType<typeof useOrder>['refetch'];
