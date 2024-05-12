import { ScrollView, Text, View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { LoadingOverlay, ViewSafeArea } from 'src/components';
import { useOrder } from 'src/hooks';
import { OrderCardStatusTag } from 'src/screens/orders/views/tags/order-card-status-tag';
import { Entity, ViewProps } from 'src/types';
import { orderUtil } from 'src/utils';

import { OrderCustomerSection } from './customer/order-customer-section';
import { OrderItemList } from './order-item-list/order-item-list';
import { OrderPaymentSection } from './price/order-detail-price-section';

export const OrderContent: FC<ViewProps & { detail: Entity.Order }> = ({
  detail,
  ...viewProps
}) => {
  const {
    data: order,
    isLoading: isLoadingOrder,
    isFetching,
  } = useOrder({
    detail,
  });

  return (
    <View {...viewProps} flex={1}>
      <LoadingOverlay isLoading={isLoadingOrder} />
      <ScrollView flex={1}>
        <View bg={'$white'} p={16}>
          <View>
            {order.status && (
              <View position="absolute" right={0}>
                <OrderCardStatusTag status={order.status} />
              </View>
            )}
            <View>
              <Text color="$textLight900">{order.code}</Text>
            </View>
            <View>
              <Text size="sm">{orderUtil.getTime(order)}</Text>
            </View>
          </View>
        </View>

        {!!order.items && <OrderItemList orderItems={order.items} bg={'$white'} py={16} mt={16} />}

        <OrderPaymentSection order={order} bg={'$white'} p={16} mt={16} />

        <OrderCustomerSection bg={'$white'} p={16} mt={16} customer={order.customer} />

        <ViewSafeArea bottom></ViewSafeArea>
      </ScrollView>
    </View>
  );
};
