import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFetchAllProductsQuery } from 'src/api';
import { cacheActions } from 'src/store/cache';
import { ProductSortType } from 'src/types';
import { productUtil } from 'src/utils/product.util';

import { useAppDispatch } from './usAppDispatch';
import { useRefreshQuery } from './use-refreshing-query';
import { useAppSelector } from './useAppSelector';

export const useSearchProducts = () => {
  const dispatch = useAppDispatch();
  const { isFetching, refetch, isLoading } = useFetchAllProductsQuery({});
  const { isRefreshing, setRefreshing, refresh } = useRefreshQuery(refetch);
  const data = useAppSelector(s => s.product.data);
  const searchText = useAppSelector(s => s.cache.product.searchText);
  const [sortBy, setSortBy] = useState<ProductSortType | undefined>();

  const products = useMemo(
    () => productUtil.filter(data, { searchText, sortBy }),
    [data, searchText, sortBy],
  );

  const setSearchText = useCallback(
    (e: string) => {
      dispatch(cacheActions.setProductSearchText(e));
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(cacheActions.setProductSearchText(''));
  }, [dispatch]);

  return {
    data: products,
    refetch,
    isFetching,
    isLoading,
    isRefreshing,
    setRefreshing,
    refresh,
    setSortBy,
    searchText,
    setSearchText,
  };
};
