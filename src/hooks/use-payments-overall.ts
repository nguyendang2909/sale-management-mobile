import { useFetchPaymentsOverallQuery } from 'src/api';
import { selectCurrentShopId } from 'src/store/shop';
import { ApiRequest, UseQuerySubscriptionOptions } from 'src/types';

import { useRefreshQuery } from './use-refreshing-query';
import { useAppSelector } from './useAppSelector';

export const usePaymentsOverall = (
  params: Omit<ApiRequest.FindAllPayments, 'shopId'>,
  options: UseQuerySubscriptionOptions,
) => {
  const shopId = useAppSelector(selectCurrentShopId);

  const query = useFetchPaymentsOverallQuery(
    {
      ...params,
      shopId,
    },
    options,
  );

  const refreshQuery = useRefreshQuery(query.refetch);

  return {
    ...query,
    ...refreshQuery,
  };
};
