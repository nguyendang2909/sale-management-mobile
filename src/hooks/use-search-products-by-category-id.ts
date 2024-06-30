import { useMemo, useState } from 'react';
import { useFetchAllProductsByCategoryIdQuery } from 'src/api';
import { ProductSortType, UseQuerySubscriptionOptions } from 'src/types';
import { productUtil } from 'src/utils/product.util';

import { useRefreshQuery } from './use-refreshing-query';

export const useSearchProductsByCategoryId = (
  { categoryId }: { categoryId: string },
  options?: UseQuerySubscriptionOptions,
) => {
  const [searchText, setSearchText] = useState<string>();
  const [sortBy, setSortBy] = useState<ProductSortType | undefined>();

  const { data: fetchedData, ...restQuery } = useFetchAllProductsByCategoryIdQuery(
    categoryId,
    options,
  );

  const data = useMemo(() => fetchedData?.data || [], [fetchedData?.data]);

  const refreshQuery = useRefreshQuery(restQuery.refetch);

  const searchData = useMemo(
    () => productUtil.filter(data, { searchText, sortBy }),
    [data, searchText, sortBy],
  );

  return {
    data: data || [],
    searchData,
    searchText,
    setSearchText,
    sortBy,
    setSortBy,
    ...restQuery,
    ...refreshQuery,
  };
};
