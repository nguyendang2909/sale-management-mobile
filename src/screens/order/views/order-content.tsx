import { ScrollView, View } from '@gluestack-ui/themed';
import _ from 'lodash';
import { FC, useMemo } from 'react';
import { useUpdateOrderMutation } from 'src/api';
import { LoadingOverlay } from 'src/components';
import { ORDER_STATUSES, ORDER_UNDELIVERED_STATUS_ARR } from 'src/constants';
import { RefetchOrder } from 'src/hooks';
import { Entity, ViewProps } from 'src/types';
import { orderPaymentUtil, orderUtil } from 'src/utils';

import { OrderCustomerSection } from './customer/order-customer-section';
import { OrderItemList } from './order-item-list/order-item-list';
import { OrderOverviewSection } from './overview/order-overview-section';
import { Payments } from './payments/payments';
import { OrderPriceSection } from './price/order-detail-price-section';
import { UndeliveredOrderNav } from './undelivered-nav/undelivered-order.nav';

export const OrderContent: FC<ViewProps & { order: Entity.Order; refetchOrder: RefetchOrder }> = ({
  order,
  refetchOrder,
  ...viewProps
}) => {
  const [updateOrderMutation, { isLoading: isUpdatingOrder }] = useUpdateOrderMutation();
  const payments = order.payments || [];
  const orderAmount = useMemo(() => orderUtil.getAmount(order), [order]);
  const paymentsAmount = orderPaymentUtil.getAllAmount(payments);
  const debt = orderAmount - paymentsAmount;
  const shouldPay = debt > 0;
  const orderStatus = useMemo(() => order.status || ORDER_STATUSES.UNCONFIRMED, [order.status]);
  const showPayment = orderStatus === ORDER_STATUSES.DELIVERED || !!payments.length;

  const isLoadingOverlay = isUpdatingOrder;

  return (
    <View {...viewProps} flex={1}>
      <LoadingOverlay isLoading={isLoadingOverlay} />
      <ScrollView flex={1}>
        <OrderOverviewSection
          bg={'$white'}
          p={16}
          orderAmount={orderAmount}
          paymentAmount={paymentsAmount}
          orderStatus={orderStatus}
          orderCode={order.code}
          orderAt={order.at}
        />
        {!!order.items && <OrderItemList orderItems={order.items} bg={'$white'} py={16} mt={16} />}
        <OrderPriceSection
          order={order}
          amount={orderAmount}
          bg={'$white'}
          p={16}
          mt={16}
          shouldPay={shouldPay}
        />
        <OrderCustomerSection bg={'$white'} p={16} mt={16} customer={order.customer} />
        {showPayment && <Payments payments={payments} debt={debt} />}
      </ScrollView>

      {_.includes(ORDER_UNDELIVERED_STATUS_ARR, order.status) && (
        <UndeliveredOrderNav
          order={order}
          shouldPay={shouldPay}
          updateOrderMutation={updateOrderMutation}
          refetchOrder={refetchOrder}
        />
      )}
    </View>
  );
};
