import { useFetchAllProductsQuery } from 'src/api';

import { useAppSelector } from './useAppSelector';

export const useOrders = () => {
  const data = useAppSelector(s => s.or.data);

  const { refetch, isFetching } = useFetchAllProductsQuery({});

  return {
    data,
    refetch,
    isFetching,
  };
};
