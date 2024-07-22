import moment from 'moment';
import { useFetchOrderStatisticsQuery } from 'src/api';
import { TIME_FORMATS } from 'src/constants';
import { selectCurrentShopId } from 'src/store/shop';

import { useRefreshQuery } from './use-refreshing-query';
import { useAppSelector } from './useAppSelector';

export const useOrderStatistics = ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  const shopId = useAppSelector(selectCurrentShopId);
  console.log(111, shopId);
  const todayDate = moment().format(TIME_FORMATS.DATE);

  const query = useFetchOrderStatisticsQuery({
    startDate: startDate !== todayDate ? startDate : undefined,
    endDate: endDate !== todayDate ? endDate : undefined,
    shopId,
  });

  const refreshQuery = useRefreshQuery(query.refetch);

  return {
    ...query,
    ...refreshQuery,
  };
};
