import { useFetchCountOrdersByShopQuery } from 'src/api';
import { ApiRequest } from 'src/types';

import { useRefreshQuery } from './use-refreshing-query';
import { useAppSelector } from './useAppSelector';

export const useCountOrders = (params: ApiRequest.FindAllOrders) => {
  const shopId = useAppSelector(s => s.shop.current.id);

  const query = useFetchCountOrdersByShopQuery({
    shopId,
    params,
  });

  const refreshQuery = useRefreshQuery(query.refetch);

  return {
    ...query,
    ...refreshQuery,
  };
};
