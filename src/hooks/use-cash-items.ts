import { useFetchAllCashItemsQuery } from 'src/api';
import { selectCurrentShopId } from 'src/store/shop';
import { ApiRequest, UseQuerySubscriptionOptions } from 'src/types';

import { useRefreshQuery } from './use-refreshing-query';
import { useAppSelector } from './useAppSelector';

export const useCashItems = (
  params: ApiRequest.FindAllCashItems,
  options: UseQuerySubscriptionOptions,
) => {
  const shopId = useAppSelector(selectCurrentShopId);

  const query = useFetchAllCashItemsQuery(
    {
      shopId,
      params,
    },
    options,
  );

  const refreshQuery = useRefreshQuery(query.refetch);

  return {
    ...query,
    ...refreshQuery,
  };
};
