import { useMemo } from 'react';
import { useFetchAllProductsQuery } from 'src/api';
import { categoryUtil } from 'src/utils/category.util';

import { useAppSelector } from './useAppSelector';

export const useSearchCategories = () => {
  const data = useAppSelector(s => s.category.data);
  const searchText = useAppSelector(s => s.cache.category.searchText);

  const { refetch, isFetching } = useFetchAllProductsQuery({});

  const categories = useMemo(() => categoryUtil.filter(data, { searchText }), [data, searchText]);

  return {
    data: categories,
    refetch,
    isFetching,
  };
};
