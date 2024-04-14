import { useFetchOrderSettingsQuery } from 'src/api/order-setting.api';

import { useAppSelector } from './useAppSelector';

export const useOrderSettings = () => {
  const data = useAppSelector(s => {
    return s.app.orderSettings;
  });

  const { refetch, isFetching } = useFetchOrderSettingsQuery();

  return {
    data,
    refetch,
    isFetching,
  };
};
