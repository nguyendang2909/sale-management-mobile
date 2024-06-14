import { useLazyFetchAllShopsQuery } from 'src/api';
import { useLazyFetchMeQuery } from 'src/api/me.api';

export const useAfterLogin = () => {
  const [fetchAllShops] = useLazyFetchAllShopsQuery();

  const [fetchMe] = useLazyFetchMeQuery();

  const handleAfterLogin = async () => {
    await fetchAllShops();
    await fetchMe();
  };

  return {
    handleAfterLogin,
  };
};
