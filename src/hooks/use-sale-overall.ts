import moment from 'moment';
import { useFetchSaleOverallByShopQuery } from 'src/api';
import { TIME_FORMATS } from 'src/constants';
import { selectCurrentShopId } from 'src/store/shop';

import { useRefreshQuery } from './use-refreshing-query';
import { useAppSelector } from './useAppSelector';

export const useSaleOverall = ({ startDate, endDate }: { startDate: string; endDate: string }) => {
  const shopId = useAppSelector(selectCurrentShopId);
  const todayDate = moment().format(TIME_FORMATS.DATE);

  const query = useFetchSaleOverallByShopQuery({
    shopId,
    params: {
      startDate: startDate !== todayDate ? startDate : undefined,
      endDate: endDate !== todayDate ? endDate : undefined,
    },
  });

  const refreshQuery = useRefreshQuery(query.refetch);

  return {
    ...query,
    ...refreshQuery,
  };
};
