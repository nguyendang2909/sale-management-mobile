import { useFetchAllCategoriesQuery } from 'src/api';

import { useAppSelector } from './useAppSelector';

export const useCategories = () => {
  const data = useAppSelector(s => s.category.data);

  const { refetch, isFetching } = useFetchAllCategoriesQuery({});

  return {
    data,
    refetch,
    isFetching,
  };
};
