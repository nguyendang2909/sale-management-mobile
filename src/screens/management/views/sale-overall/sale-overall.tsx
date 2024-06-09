import { useSaleOverall } from 'src/hooks';
import { timeUtil } from 'src/utils';

import { CardsSaleOverall } from './cards-sale-overall';

export const SaleOverall = () => {
  const { data: saleOverall } = useSaleOverall({
    startDate: timeUtil.getDate(),
    endDate: timeUtil.getDate(),
  });

  return (
    <>
      <CardsSaleOverall
        revenue={saleOverall?.data.revenue}
        totalOrders={saleOverall?.data.totalOrders}
      />
    </>
  );
};
