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
  const query = useFetchAllProductsQuery({});

  const refreshQuery = useRefreshQuery(query.refetch);
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
    ...query,
    ...refreshQuery,
    setSortBy,
    searchText,
    setSearchText,
    data: products,
  };
};
