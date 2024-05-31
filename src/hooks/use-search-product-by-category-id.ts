import { useMemo, useState } from 'react';
import { useFetchAllProductsByCategoryIdQuery } from 'src/api';
import { ProductSortType } from 'src/types';
import { productUtil } from 'src/utils/product.util';

import { useRefreshingQuery } from './use-refreshing-query';
import { useAppSelector } from './useAppSelector';

export const useSearchProductsByCategoryId = ({ categoryId }: { categoryId: string }) => {
  const { refetch, isFetching, isLoading } = useFetchAllProductsByCategoryIdQuery({
    categoryId,
  });
  const data = useAppSelector(s =>
    s.product.data.filter(p => !!p.categories?.find(c => (c.id = categoryId))),
  );
  const { isRefreshing, setRefreshing, refresh } = useRefreshingQuery(refetch);
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
