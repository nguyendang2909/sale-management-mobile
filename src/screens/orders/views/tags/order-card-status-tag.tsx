import { Text, View } from '@gluestack-ui/themed';
import { FC } from 'react';
import { ORDER_STATUSES } from 'src/constants';
import { OrderStatus } from 'src/types';
import { orderUtil } from 'src/utils';

export const OrderCardStatusTag: FC<{ status: OrderStatus }> = ({ status }) => {
  switch (status) {
    case ORDER_STATUSES.PROCESSING:
      return (
        <View bgColor="$amber100" p={4} borderRadius={4}>
          <Text fontSize={14} lineHeight={14} color="$red500">
            {orderUtil.getOrderStatusTagTranslation(status)}
          </Text>
        </View>
      );
    default:
      return (
        <View bgColor="$amber100" p={4} borderRadius={4}>
          <Text fontSize={14} lineHeight={14} color="$red500">
            {orderUtil.getOrderStatusTagTranslation(status)}
          </Text>
        </View>
      );
  }
};
