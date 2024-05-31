import { useMemo, useState } from 'react';
import { useFetchAllProductsByCategoryIdQuery } from 'src/api';
import { ProductSortType } from 'src/types';
import { productUtil } from 'src/utils/product.util';

import { useRefreshingQuery } from './use-refreshing-query';

export const useSearchProductsByCategoryId = ({ categoryId }: { categoryId: string }) => {
  const [searchText, setSearchText] = useState<string>();
  const [sortBy, setSortBy] = useState<ProductSortType | undefined>();

  const {
    data: fetchData,
    refetch,
    isFetching,
    isLoading,
  } = useFetchAllProductsByCategoryIdQuery({
    categoryId,
  });
  const { isRefreshing, setRefreshing, refresh } = useRefreshingQuery(refetch);

  const data = useMemo(() => fetchData?.data || [], [fetchData?.data]);

  const products = useMemo(
    () => productUtil.filter(data, { searchText, sortBy }),
    [data, searchText, sortBy],
  );

  return {
    data: products,
    refetch,
    isFetching,
    searchText,
    setSearchText,
    sortBy,
    setSortBy,
    isRefreshing,
    setRefreshing,
    refresh,
    isLoading,
  };
};
