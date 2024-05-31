import { useFetchCategoryQuery } from 'src/api';
import { AppStore } from 'src/types';

import { useAppSelector } from './useAppSelector';

export const useCategory = ({ detail }: { detail: AppStore.Category }) => {
  const data = useAppSelector(s => {
    return s.category.data.find(e => e.id === detail.id);
  });

  const { refetch, isFetching, isLoading } = useFetchCategoryQuery(detail.id, {
    refetchOnMountOrArgChange: true,
  });

  return {
    data: data || detail,
    refetch,
    isLoading,
    isFetching,
  };
};
