import { useMemo } from 'react';
import { useFetchAllCategoriesQuery } from 'src/api';
import { categoryUtil } from 'src/utils/category.util';

import { useRefreshingQuery } from './use-refreshing-query';
import { useAppSelector } from './useAppSelector';

export const useSearchCategories = () => {
  const data = useAppSelector(s => s.category.data);
  const searchText = useAppSelector(s => s.cache.category.searchText);

  const { refetch, isFetching } = useFetchAllCategoriesQuery({});
  const { isRefreshing, refresh } = useRefreshingQuery(refetch);

  const categories = useMemo(() => categoryUtil.filter(data, { searchText }), [data, searchText]);

  return {
    data: categories,
    refetch,
    isFetching,
    isRefreshing,
    refresh,
  };
};
