import { ScrollView, Text, View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { LoadingOverlay } from 'src/components';
import { useOrder } from 'src/hooks';
import { OrderCardStatusTag } from 'src/screens/orders/views/tags/order-card-status-tag';
import { Entity } from 'src/types';
import { orderUtil } from 'src/utils';

import { OrderDetailCustomerSection } from './customer/order-detail-customer-section';
import { OrderItemListItem } from './order-item-list/order-item-list-item';
import { OrderDetailPriceSection } from './price/order-detail-price-section';

export const OrderDetailContent: FC<{ detail: Entity.Order }> = ({ detail }) => {
  const {
    data: order,
    isLoading: isLoadingOrder,
    isFetching,
  } = useOrder({
    detail,
  });

  return (
    <>
      <LoadingOverlay isLoading={isLoadingOrder} />
      <ScrollView>
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

        <View bg={'$white'} py={16} mt={16}>
          <View>
            {order.items?.map(item => {
              return (
                <>
                  <OrderItemListItem orderItem={item} />
                </>
              );
            })}
          </View>
        </View>

        <OrderDetailPriceSection order={order} bg={'$white'} p={16} mt={16} />

        <OrderDetailCustomerSection bg={'$white'} p={16} mt={16} customer={order.customer} />
      </ScrollView>
    </>
  );
};
