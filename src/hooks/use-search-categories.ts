import { useMemo } from 'react';
import { useFetchAllCategoriesQuery } from 'src/api';
import { categoryUtil } from 'src/utils/category.util';

import { useRefreshQuery } from './use-refreshing-query';
import { useAppSelector } from './useAppSelector';

export const useSearchCategories = () => {
  const data = useAppSelector(s => s.category.data);
  const searchText = useAppSelector(s => s.cache.category.searchText);

  const query = useFetchAllCategoriesQuery({});
  const refreshQuery = useRefreshQuery(query.refetch);

  const categories = useMemo(() => categoryUtil.filter(data, { searchText }), [data, searchText]);

  return {
    ...query,
    ...refreshQuery,
    data: categories,
  };
};
