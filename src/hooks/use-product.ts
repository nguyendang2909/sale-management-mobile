import { useFetchProductQuery } from 'src/api';
import { AppStore } from 'src/types';

import { useAppSelector } from './useAppSelector';

export const useProduct = ({ detail }: { detail: AppStore.Product }) => {
  const data = useAppSelector(s => {
    return s.product.data.find(e => e.id === detail.id);
  });

  const { refetch, isFetching, isLoading } = useFetchProductQuery(detail.id, {
    refetchOnMountOrArgChange: true,
  });

  return {
    data: data || detail,
    refetch,
    isLoading,
    isFetching,
  };
};
