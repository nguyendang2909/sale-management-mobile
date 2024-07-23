import { useFetchCountOrdersQuery } from 'src/api';
import { ApiRequest } from 'src/types';

import { useRefreshQuery } from './use-refreshing-query';
import { useAppSelector } from './useAppSelector';

export const useCountOrders = (params: Omit<ApiRequest.FindAllOrders, 'shopId'>) => {
  const shopId = useAppSelector(s => s.shop.current.id);

  const query = useFetchCountOrdersQuery({ ...params, shopId });

  const refreshQuery = useRefreshQuery(query.refetch);

  return {
    ...query,
    ...refreshQuery,
  };
};
