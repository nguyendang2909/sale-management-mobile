import { useMemo } from 'react';
import { useFetchAllProductsQuery } from 'src/api';
import { productUtil } from 'src/utils/product.util';

import { useRefreshingQuery } from './use-refreshing-query';
import { useAppSelector } from './useAppSelector';

export const useSearchProducts = () => {
  const { refetch, isFetching } = useFetchAllProductsQuery({});
  const { isRefreshing, setRefreshing, refresh } = useRefreshingQuery(refetch);
  const data = useAppSelector(s => s.product.data);
  const searchText = useAppSelector(s => s.cache.product.searchText);
  const sortBy = useAppSelector(s => s.cache.product.sortType);

  const products = useMemo(
    () => productUtil.filter(data, { searchText, sortBy }),
    [data, searchText, sortBy],
  );

  return {
    data: products,
    refetch,
    isFetching,
    isRefreshing,
    setRefreshing,
    refresh,
  };
};
