import { useFetchAllCustomersQuery } from 'src/api';

import { useAppSelector } from './useAppSelector';

export const useCustomers = () => {
  const data = useAppSelector(s => s.customer.data);

  const { refetch, isFetching } = useFetchAllCustomersQuery({});

  return {
    data,
    refetch,
    isFetching,
  };
};
