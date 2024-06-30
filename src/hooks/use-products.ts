import { useFetchAllProductsQuery } from 'src/api';

import { useRefreshQuery } from './use-refreshing-query';
import { useAppSelector } from './useAppSelector';

export const useProducts = () => {
  const data = useAppSelector(s => s.product.data);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
  const { data: fetchedData, ...restQuery } = useFetchAllProductsQuery({});
  const refreshQuery = useRefreshQuery(restQuery.refetch);

  return {
    ...restQuery,
    ...refreshQuery,
    data,
  };
};
