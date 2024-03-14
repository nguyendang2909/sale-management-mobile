import { useFetchAllProductsQuery } from 'src/api';

import { useAppSelector } from './useAppSelector';

export const useProducts = () => {
  const data = useAppSelector(s => s.product.data);

  const { refetch, isFetching } = useFetchAllProductsQuery({});

  return {
    data,
    refetch,
    isFetching,
  };
};
