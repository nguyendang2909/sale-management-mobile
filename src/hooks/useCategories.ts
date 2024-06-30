import { useFetchAllCategoriesQuery } from 'src/api';

import { useRefreshQuery } from './use-refreshing-query';
import { useAppSelector } from './useAppSelector';

export const useCategories = () => {
  const data = useAppSelector(s => s.category.data);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: fetchedData, ...restQuery } = useFetchAllCategoriesQuery({});
  const refreshingQuery = useRefreshQuery(restQuery.refetch);

  return {
    data,
    ...restQuery,
    ...refreshingQuery,
  };
};
