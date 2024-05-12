import { View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { Entity, ViewProps } from 'src/types';

import { OrderItemListItem } from './order-item-list-item';

export const OrderItemList: FC<ViewProps & { orderItems: Entity.OrderItem[] }> = ({
  orderItems,
  ...viewProps
}) => {
  return (
    <View {...viewProps}>
      {orderItems.map(item => {
        return (
          <>
            <OrderItemListItem orderItem={item} />
          </>
        );
      })}
    </View>
  );
};
