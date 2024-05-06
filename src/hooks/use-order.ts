import { useFetchOrderQuery } from 'src/api';
import { Entity } from 'src/types';

export const useOrder = ({ detail }: { detail: Entity.Order }) => {
  const {
    refetch,
    isFetching,
    data: fetchedData,
    isLoading,
  } = useFetchOrderQuery(detail.id, { refetchOnMountOrArgChange: true });

  const data = fetchedData?.data || detail;

  return {
    data: data || detail,
    refetch,
    isFetching,
    isLoading,
  };
};
