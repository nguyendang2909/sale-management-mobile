import { useFetchSettingsQuery } from 'src/api';

import { useAppSelector } from './useAppSelector';

export const useSettings = () => {
  const data = useAppSelector(s => {
    return s.app.settings;
  });

  const { refetch, isFetching } = useFetchSettingsQuery();

  return {
    data,
    refetch,
    isFetching,
  };
};
