import { ScrollView, View } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';
import { FC, useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoadingOverlay } from 'src/components';
import { ORDER_STATUSES, ORDER_UNDELIVERED_STATUS_ARR, SCREENS } from 'src/constants';
import { Entity, ViewProps } from 'src/types';
import { orderUtil } from 'src/utils';

import { OrderCustomerSection } from './customer/order-customer-section';
import { OrderItemList } from './order-item-list/order-item-list';
import { OrderOverviewSection } from './overview/order-overview-section';
import { Payments } from './payments/payments';
import { OrderPaymentSection } from './price/order-detail-price-section';
import { UndeliveredOrderNav } from './undelivered-nav/undelivered-order.nav';

export const OrderContent: FC<ViewProps & { order: Entity.Order; isFetchingOrder: boolean }> = ({
  order,
  isFetchingOrder,
  ...viewProps
}) => {
  const navigation = useNavigation();

  const handleConfirmDelivery = () => {
    navigation.navigate(SCREENS.ORDER_PAYMENT, { order });
  };

  const orderAmount = useMemo(() => orderUtil.getAmount(order), [order]);

  return (
    <View {...viewProps} flex={1}>
      <LoadingOverlay isLoading={isFetchingOrder} />
      <ScrollView flex={1}>
        <OrderOverviewSection order={order} bg={'$white'} p={16} />
        {!!order.items && <OrderItemList orderItems={order.items} bg={'$white'} py={16} mt={16} />}
        <OrderPaymentSection order={order} amount={orderAmount} bg={'$white'} p={16} mt={16} />
        <OrderCustomerSection bg={'$white'} p={16} mt={16} customer={order.customer} />

        {order.status === ORDER_STATUSES.DELIVERED && (
          <Payments payments={order.payments || []} orderAmount={orderAmount} />
        )}
      </ScrollView>

      {_.includes(ORDER_UNDELIVERED_STATUS_ARR, order.status) && (
        <UndeliveredOrderNav
          shadowOffset={{
            width: 0,
            height: 1,
          }}
          shadowOpacity={0.25}
          shadowRadius={3}
          elevation={3}
          px={16}
          pt={16}
          bgColor="white"
          as={SafeAreaView}
          orderId={order.id}
          // @ts-ignore
          edges={['bottom']}
        />
      )}
    </View>
  );
};
