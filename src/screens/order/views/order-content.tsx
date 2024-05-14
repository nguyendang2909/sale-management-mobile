import { ScrollView, View } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';
import { FC } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoadingOverlay } from 'src/components';
import { ORDER_UNDELIVERED_STATUS_ARR, SCREENS } from 'src/constants';
import { Entity, ViewProps } from 'src/types';

import { OrderCustomerSection } from './customer/order-customer-section';
import { OrderItemList } from './order-item-list/order-item-list';
import { OrderOverviewSection } from './overview/order-overview-section';
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

  return (
    <View {...viewProps} flex={1}>
      <LoadingOverlay isLoading={isFetchingOrder} />
      <ScrollView flex={1}>
        <OrderOverviewSection order={order} bg={'$white'} p={16} />
        {!!order.items && <OrderItemList orderItems={order.items} bg={'$white'} py={16} mt={16} />}
        <OrderPaymentSection order={order} bg={'$white'} p={16} mt={16} />
        <OrderCustomerSection bg={'$white'} p={16} mt={16} customer={order.customer} />
      </ScrollView>

      {_.includes(ORDER_UNDELIVERED_STATUS_ARR, order.status) && (
        <UndeliveredOrderNav
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
