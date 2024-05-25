import { useFetchAllShopsQuery } from 'src/api/shop.api';

import { useAppSelector } from './useAppSelector';

export const useShops = () => {
  const data = useAppSelector(s => s.app.shops) || [];

  const { refetch, isFetching, isLoading } = useFetchAllShopsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });

  return {
    data,
    refetch,
    isFetching,
    isLoading,
  };
};
