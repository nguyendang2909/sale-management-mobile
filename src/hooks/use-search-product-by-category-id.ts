import { useMemo, useState } from 'react';
import { useFetchAllProductsByCategoryIdQuery } from 'src/api';
import { ProductSortType } from 'src/types';
import { productUtil } from 'src/utils/product.util';

import { useRefreshQuery } from './use-refreshing-query';

export const useSearchProductsByCategoryId = ({ categoryId }: { categoryId: string }) => {
  const [searchText, setSearchText] = useState<string>();
  const [sortBy, setSortBy] = useState<ProductSortType | undefined>();

  const { data: fetchData, ...restQuery } = useFetchAllProductsByCategoryIdQuery(
    {
      categoryId,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );
  const refreshQuery = useRefreshQuery(restQuery.refetch);

  const data = useMemo(() => fetchData?.data || [], [fetchData?.data]);

  const products = useMemo(
    () => productUtil.filter(data, { searchText, sortBy }),
    [data, searchText, sortBy],
  );

  return {
    ...restQuery,
    ...refreshQuery,
    data: products,
    searchText,
    setSearchText,
    sortBy,
    setSortBy,
  };
};
