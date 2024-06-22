import { useFetchShopQuery } from 'src/api';

import { useAppSelector } from './useAppSelector';

export const useCurrentShop = () => {
  const data = useAppSelector(s => {
    return s.app.shop;
  });

  const { refetch, isFetching, isLoading } = useFetchShopQuery(data.id, {
    refetchOnMountOrArgChange: true,
  });

  return {
    data,
    refetch,
    isLoading,
    isFetching,
  };
};
