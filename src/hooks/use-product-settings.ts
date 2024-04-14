import { useFetchProductSettingsQuery } from 'src/api';

import { useAppSelector } from './useAppSelector';

export const useProductSettings = () => {
  const data = useAppSelector(s => {
    return s.app.productSettings;
  });

  const { refetch, isFetching } = useFetchProductSettingsQuery();

  return {
    data,
    refetch,
    isFetching,
  };
};
