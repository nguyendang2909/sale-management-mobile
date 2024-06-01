import { useMemo, useState } from 'react';
import { useFetchAllProductsQuery } from 'src/api';
import { ProductSortType } from 'src/types';
import { productUtil } from 'src/utils/product.util';

import { useRefreshQuery } from './use-refreshing-query';
import { useAppSelector } from './useAppSelector';

export const useSearchProducts = () => {
  const { isFetching, refetch, isLoading } = useFetchAllProductsQuery({});
  const { isRefreshing, setRefreshing, refresh } = useRefreshQuery(refetch);
  const data = useAppSelector(s => s.product.data);
  const [searchText, setSearchText] = useState<string>();
  const [sortBy, setSortBy] = useState<ProductSortType | undefined>();

  const products = useMemo(
    () => productUtil.filter(data, { searchText, sortBy }),
    [data, searchText, sortBy],
  );

  return {
    data: products,
    refetch,
    isFetching,
    isLoading,
    isRefreshing,
    setRefreshing,
    refresh,
    setSearchText,
    setSortBy,
  };
};
