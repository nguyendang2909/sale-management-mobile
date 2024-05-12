import { ScrollView, View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoadingOverlay } from 'src/components';
import { useOrder } from 'src/hooks';
import { Entity, ViewProps } from 'src/types';

import { OrderCustomerSection } from './customer/order-customer-section';
import { OrderItemList } from './order-item-list/order-item-list';
import { OrderOverviewSection } from './overview/order-overview-section';
import { OrderPaymentSection } from './price/order-detail-price-section';

export const OrderContent: FC<ViewProps & { detail: Entity.Order }> = ({
  detail,
  ...viewProps
}) => {
  const { data: order, isLoading: isLoadingOrder } = useOrder({
    detail,
  });

  return (
    <View
      {...viewProps}
      as={SafeAreaView}
      // @ts-ignore
      edges={['bottom']}
      flex={1}
    >
      <LoadingOverlay isLoading={isLoadingOrder} />
      <ScrollView flex={1}>
        <OrderOverviewSection order={order} bg={'$white'} p={16} />
        {!!order.items && <OrderItemList orderItems={order.items} bg={'$white'} py={16} mt={16} />}
        <OrderPaymentSection order={order} bg={'$white'} p={16} mt={16} />
        <OrderCustomerSection bg={'$white'} p={16} mt={16} customer={order.customer} />
      </ScrollView>
    </View>
  );
};
